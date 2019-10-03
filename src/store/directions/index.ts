import Vue from 'vue'
import map from '@/services/map'
import route from '@/store/route'

export interface State {
  directions: google.maps.DirectionsResult | null
  directionsRequest: Promise<google.maps.DirectionsResult> | null
  directionsError: Error | null
}

export class DirectionsStore {
  public readonly state = Vue.observable<State>({
    directions: null,
    directionsRequest: null,
    directionsError: null,
  })

  public load = async (optimizeWaypoints: boolean = false): Promise<void> => {
    try {
      const request = map.getDirections({
        ...this.directionsRequestConfig,
        optimizeWaypoints,
      })

      this.onDirectionsRequest(request)
      this.onDirectionsSuccess(await request)
    } catch (e) {
      this.onDirectionsFailure(e)
    }
  }

  public clear = () => {
    this.state.directions = null
    this.state.directionsRequest = null
    this.state.directionsError = null
    map.clear()
  }

  private onDirectionsRequest = (request: Promise<google.maps.DirectionsResult>): void => {
    this.state.directionsRequest = request
    this.state.directionsError = null
  }

  private onDirectionsSuccess = (directions: google.maps.DirectionsResult): void => {
    this.state.directionsRequest = null
    this.state.directions = directions

    route.reorder(directions.routes[0].waypoint_order)
  }

  private onDirectionsFailure = (error: Error): void => {
    this.state.directionsRequest = null
    this.state.directionsError = error
  }

  get directionsRequestConfig (): google.maps.DirectionsRequest {
    return {
      origin: route.state.route.StartLocationAddress__c,
      destination: route.state.route.EndLocationAddress__c,
      travelMode: 'DRIVING' as any,
      drivingOptions: {
        departureTime: new Date(route.state.route.ScheduledStartTime__c),
      },
      waypoints: route.waypoints,
    }
  }

  get route (): google.maps.DirectionsRoute | null {
    return this.state.directions ? this.state.directions.routes[0] : null
  }

}

export default new DirectionsStore()