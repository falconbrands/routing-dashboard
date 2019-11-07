import Vue from 'vue'
import salesforce, { Order, Route, RouteStop, Geolocation } from '@/services/salesforce'
import directions from '@/store/directions'
import orders, { OrdersStore } from '@/store/orders'
import { DateTime } from 'luxon'
import { stripHTML } from '@/services/utils'

export type UnfinishedRoute = Partial<Route> & Pick<Route, 'ScheduledStartTime__c'>
export type UnfinishedRouteStop = Pick<RouteStop, 'Order__c' | 'Order__r' | 'AdditionalOrder1__c' | 'AdditionalOrder1__r' | 'AdditionalOrder2__c' | 'AdditionalOrder2__r'>

export interface State {
  route: UnfinishedRoute
  routeLoadRequest: Promise<Route> | null
  routeLoadError: Error | null
  routeSaveRequest: Promise<string> | null
  routeSaveError: Error | null
  stops: UnfinishedRouteStop[]
}

export class RouteStore {
  public readonly state = Vue.observable<State>({
    route: {
      ScheduledStartTime__c: DateTime.local().startOf('day').plus({ days: 1, hours: 6 }).toMillis(),
    },
    routeLoadRequest: null,
    routeLoadError: null,
    routeSaveRequest: null,
    routeSaveError: null,
    stops: [],
  })

  public async load (routeId: string) {
    try {
      const request = salesforce.fetchRoute(routeId)

      this.onLoadRequest(request)
      this.onLoadSuccess(await request)
    } catch (e) {
      this.onLoadFailure(e)
    }
  }

  private onLoadRequest = (request: Promise<Route>) => {
    this.state.routeLoadRequest = request
    this.state.routeLoadError = null
  }

  private onLoadSuccess = (payload: Route) => {
    this.state.routeLoadRequest = null
    this.state.route = payload

    if (payload.RouteStops__r) {
      this.state.stops = payload.RouteStops__r.sort((a, b) => a.EstimatedArrivalTime__c - b.EstimatedArrivalTime__c)
    }
  }

  private onLoadFailure = (error: Error) => {
    this.state.routeLoadRequest = null
    this.state.routeLoadError = error
  }

  public async save () {
    try {
      const request = salesforce.saveRoute(this.route, this.stops)

      this.onSaveRequest(request)
      this.onSaveSuccess(await request)
    } catch (e) {
      this.onSaveFailure(e)
    }
  }

  private onSaveRequest = (request: Promise<string>) => {
    this.state.routeSaveRequest = request
    this.state.routeSaveError = null
  }

  private onSaveSuccess = (payload: string) => {
    window.location.href = `/lightning/r/Route__c/${payload}/view`
  }

  private onSaveFailure = (error: Error) => {
    this.state.routeSaveRequest = null
    this.state.routeSaveError = error
  }

  get route (): Route {
    if (!directions.route) {
      return this.state.route as Route
    }

    // if directions exist, augment the current route with additional information

    const penultimateStop: RouteStop | undefined = this.stops[this.stops.length - 1]
    const penultimateDepartureTime = !penultimateStop ? this.state.route.ScheduledStartTime__c : penultimateStop.EstimatedDepartureTime__c

    return {
      ...this.state.route,
      StartLocationCoordinates__Latitude__s: directions.route.legs[0].start_location.lat(),
      StartLocationCoordinates__Longitude__s: directions.route.legs[0].start_location.lng(),
      EndLocationCoordinates__Latitude__s: directions.route.legs[directions.route.legs.length - 1].end_location.lat(),
      EndLocationCoordinates__Longitude__s: directions.route.legs[directions.route.legs.length - 1].end_location.lng(),
      ScheduledEndTime__c: penultimateDepartureTime + directions.route.legs[directions.route.legs.length - 1].duration.value * 1000
    } as Route
  }

  get stops (): RouteStop[] {
    const route = directions.route

    if (!route) {
      return this.state.stops as RouteStop[]
    }

    return this.state.stops.reduce((stops, stop, index) => {
      const leg = route.legs[index]

      const previousStop = stops[index - 1]
      const previousEstimatedDepartureTime = !previousStop ? this.state.route.ScheduledStartTime__c : previousStop.EstimatedDepartureTime__c
      const estimatedStopDuration = 1800000
      const estimatedArrivalTime = previousEstimatedDepartureTime + leg.duration.value * 1000

      stops.push({
        Order__c: stop.Order__c,
        Order__r: stop.Order__r,
        AdditionalOrder1__c: stop.AdditionalOrder1__c,
        AdditionalOrder2__c: stop.AdditionalOrder2__c,
        EstimatedArrivalTime__c: estimatedArrivalTime,
        EstimatedDepartureTime__c: estimatedArrivalTime + estimatedStopDuration,
        LocationCoordinates__Latitude__s: leg.end_location.lat(),
        LocationCoordinates__Longitude__s: leg.end_location.lng(),
        TurnByTurnDirections__c: this.generateTurnByTurnDirections(leg),
      } as RouteStop)

      return stops
    }, [] as RouteStop[])
  }

  public updateStops = (stops: UnfinishedRouteStop[]) => {
    this.state.stops = stops
    directions.load()
  }

  public removeStop = (stop: UnfinishedRouteStop) => {
    this.state.stops = this.state.stops.filter((existingStop) => {
      return existingStop.Order__c !== stop.Order__c
    })

    directions.clear()
  }

  public updateScheduledStartTime = (value: number) => {
    Vue.set(this.state.route, 'ScheduledStartTime__c', value)
    directions.clear()
  }

  public updateStartLocationAddress = (value: string) => {
    Vue.set(this.state.route, 'StartLocationAddress__c', value)
    this.updateEndLocationAddress(value)
    directions.clear()
  }

  public updateEndLocationAddress = (value: string) => {
    Vue.set(this.state.route, 'EndLocationAddress__c', value)
    directions.clear()
  }

  get waypoints (): google.maps.DirectionsWaypoint[] {
    return this.state.stops.map((stop) => ({
      location: orders.getAddressFromOrder(stop.Order__r),
    }))
  }

  public addOrder = (order: Order) => {
    const existingIndex = this.findIndexWithIdenticalAccount(order)

    if (existingIndex === -1) {
      this.createNewStopWithOrder(order)
    } else {
      this.addOrderToExistingStop(order, existingIndex)
    }
  }

  private createNewStopWithOrder = (order: Order) => {
    this.state.stops.push({
      Order__c: order.Id,
      Order__r: order,
    })
  }

  private addOrderToExistingStop = (order: Order, stopIndex: number) => {
    const stop = this.state.stops[stopIndex]

    if (!stop.AdditionalOrder1__r) {
      Vue.set(stop, 'AdditionalOrder1__c', order.Id)
      Vue.set(stop, 'AdditionalOrder1__r', order)
    } else if (!stop.AdditionalOrder2__r) {
      Vue.set(stop, 'AdditionalOrder2__c', order.Id)
      Vue.set(stop, 'AdditionalOrder2__r', order)
    }

  }

  public reorder = (indexes: number[]) => {
    this.state.stops = indexes.reduce((stops, indexOptimized, index) => {
      stops[indexOptimized] = this.state.stops[index] 
      return stops
    }, [] as UnfinishedRouteStop[])
  }

  private findIndexWithIdenticalAccount = (order: Order) => {
    return this.state.stops.findIndex((stop) => {
      return stop.Order__r.Account.Name.toLowerCase() === order.Account.Name.toLowerCase()
      // return stop.Order__r.ShippingStreet.toLowerCase() === order.ShippingStreet.toLowerCase() && stop.Order__r.ShippingState.toLowerCase() === order.ShippingState.toLowerCase()
    })
  }

  private generateTurnByTurnDirections = (leg: google.maps.DirectionsLeg): string => {
    return leg.steps.reduce((s, step) => {
      return s + stripHTML(step.instructions) + '\n'
    }, '')
  }

}

export default new RouteStore()