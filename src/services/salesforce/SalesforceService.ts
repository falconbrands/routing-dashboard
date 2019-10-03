
import { DistributionCenter, Order, Route, RouteStop } from './types'

declare global {
  interface Window {
    rtng_RouteControllerExtension: any;
    DELIVERY_ROUTE_ID: string;
 }
}

export class SalesforceService {

  public fetchRoute = (routeId: string) => new Promise<Route>((resolve) => {
    window.rtng_RouteControllerExtension.getRoute(routeId, (result: any) => {
      console.log('-- SALESFORCE: fetchRoute --', result)
      resolve(result)
    })
  })

  public getOrders = () => new Promise<Order[]>((resolve, reject) => {
    window.rtng_RouteControllerExtension.getOrders((result: any) => {
      console.log('-- SALESFORCE: getOrders --', result)
      resolve(result)
    })
  })

  public getDistributionCenters = () => new Promise<DistributionCenter[]>((resolve, reject) => {
    window.rtng_RouteControllerExtension.getDistributionCenters((result: any) => {
      console.log('-- SALESFORCE: getDistributionCenters --', result)
      resolve(result)
    })
  })

  public saveRoute = (route: Route, routeStops: RouteStop[]) => new Promise<string>((resolve, reject) => {
    delete route.RouteStops__r

    routeStops.forEach((stop) => {
      delete stop.Id 
      delete stop.Order__r
      delete stop.AdditionalOrder1__r
      delete stop.AdditionalOrder2__r
    })

    window.rtng_RouteControllerExtension.saveRoute(JSON.stringify(route), JSON.stringify(routeStops), (result: any) => {
      console.log('-- SALESFORCE: saveRoute --', result)
      resolve(result)
    })
  })

  public getDistributionZones = () => new Promise<string[]>((resolve, reject) => {
    window.rtng_RouteControllerExtension.getDistributionZones((result: any) => {
      console.log('-- SALESFORCE: getDistributionZones --', result)
      resolve(result)
    })
  })

}