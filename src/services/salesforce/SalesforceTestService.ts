import { Order, DistributionCenter, Route, RouteStop } from './types'

export class SalesforceTestService {

  public getOrders = async (): Promise<Order[]> => {
    return [
      {
        Id: "XX",
        OrderNumber: '3004542622',
        Status: 'Status',
        ShippingStreet: '448 S Hill St.',
        ShippingCity: 'Los Angeles',
        ShippingState: 'California',
        DeliveryZone__c: 'Zone Something',
        Scheduled_Delivery_Date__c: new Date().getTime(),
        Distribution_Center__c: 'xxxxxxx',
        Account: {
          ID: 'sdjfhskjfhsd',
          DBA__c: 'dba',
          Name: 'Some Account'
        },
      },
      {
        Id: "X5X",
        OrderNumber: '2352352352',
        Status: 'Status',
        ShippingStreet: '',
        ShippingCity: 'Sacramento',
        ShippingState: 'California',
        DeliveryZone__c: 'Zone Something',
        Scheduled_Delivery_Date__c: new Date().getTime(),
        Distribution_Center__c: 'xxxxxxx',
        Account: {
          ID: 'sdjfhskjfhsd',
          DBA__c: 'dba',
          Name: 'Some Account'
        },
      },
      {
        Id: "SX5X",
        OrderNumber: '1243426262',
        Status: 'Status',
        ShippingStreet: '',
        ShippingCity: 'San Fransisco',
        ShippingState: 'California',
        DeliveryZone__c: 'Zone Something',
        Scheduled_Delivery_Date__c: new Date().getTime(),
        Distribution_Center__c: 'xxxxxxx',
        Account: {
          ID: 'id',
          DBA__c: 'dba',
          Name: 'Some Account'
        },
      },
    ]
  }

  public saveRoute = async (route: Route, routeStops: RouteStop[]): Promise<string> => {
    return 'hehehe'
  }

  public getDistributionCenters = async (): Promise<DistributionCenter[]> => {
    return [
      {
        Id: 'xxxxxxx',
        Name: 'Center',
        Address__c: '35903 Date Palm Dr',
        City_State_Zip__c: 'Cathedral City, CA',
      },
      {
        Id: 'seee',
        Name: 'Center With A Really Long',
        Address__c: '',
        City_State_Zip__c: 'Los Angeles, CA',
      }
    ]
  }

  public getDistributionZones = async () => {
    return [
      'Long Beach',
      'Orange County',
      'Ventura',
    ]
  }

  public fetchRoute = async (routeId: string): Promise<Route> => {
    return {} as any
  }

  public fetchRouteStops = async (routeId: string): Promise<RouteStop[]> => {
    return []
  }

  // public createSamsaraRoute = (payload: RouteConfig) => new Promise<Route>((resolve, reject) => {
  //   (window as any).RoutingDashboardController.createSamsaraRoute(JSON.stringify(payload), (result: any) => {
  //     resolve(result)
  //   })
  // })

  // public updateSamsaraRoute = (routeId: number, payload: RouteConfig) => new Promise<Route>((resolve, reject) => {
  //   (window as any).RoutingDashboardController.updateSamsaraRoute(routeId, JSON.stringify(payload), (result: any) => {
  //     resolve(result)
  //   })
  // })

  // public loadSamsaraRoute = (routeId: number) => new Promise<Route>((resolve, reject) => {
  //   (window as any).RoutingDashboardController.loadSamsaraRoute(routeId, (result: any) => {
  //     resolve(result)
  //   })
  // })

  // public updateOrderData = (orderNumbers: string[], dispatchJobIds: number[], routeId: number) => new Promise((resolve, reject) => {
  //   (window as any).RoutingDashboardController.updateOrderData(orderNumbers, JSON.stringify(dispatchJobIds), routeId, (result: any) => {
  //     resolve(result)
  //   })
  // })

  // public clearOrderData = (orderNumbers: string[]) => new Promise((resolve, reject) => {
  //   (window as any).RoutingDashboardController.clearOrderData(JSON.stringify(orderNumbers), (result: any) => {
  //     resolve(result)
  //   })
  // })

  
  

}