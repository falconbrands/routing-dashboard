import Vue from 'vue'
import distribution from '@/store/distribution'
import orders from '@/store/orders'
import zones from '@/store/zones'
import route from '@/store/route'

export interface State {
  initializeRequest: Promise<void> | null
  initializeError: Error | null
}

export class ApplicationStore {
  public readonly state = Vue.observable<State>({
    initializeRequest: null,
    initializeError: null,
  })

  public initialize = async () => {
    try {
      const requests = [
        orders.load(),
        zones.load(),
        distribution.load(),
      ]

      if (window.DELIVERY_ROUTE_ID && window.DELIVERY_ROUTE_ID.length !== 0) {
        console.log("FOUND DELIVERY ROUTE ID " + window.DELIVERY_ROUTE_ID)
        requests.push(route.load(window.DELIVERY_ROUTE_ID))
      }

      const request = Promise.all(requests)

      this.onInitializeRequest(request)
      this.onInitializeSuccess(await request)
    } catch (e) {
      this.onInitializeFailure(e)
    }
  }

  private onInitializeRequest = (request: Promise<any>) => {
    this.state.initializeRequest = request
    this.state.initializeError = null
  }

  private onInitializeSuccess = (result: any) => {
    this.state.initializeRequest = null

    // apply fallback defaults

    if (!route.state.route.StartLocationAddress__c) {
      route.updateStartLocationAddress(distribution.getAddressFromCenter(distribution.state.centers[0]))
    }

    if (!route.state.route.EndLocationAddress__c) {
      route.updateEndLocationAddress(distribution.getAddressFromCenter(distribution.state.centers[0]))
    }
  }

  private onInitializeFailure = (error: Error) => {
    this.state.initializeRequest = null
    this.state.initializeError = error
  }

}

export default new ApplicationStore()