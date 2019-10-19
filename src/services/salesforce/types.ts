export interface Order {
  Id: string
  OrderNumber: string
  Status: string
  ShippingStreet: string
  ShippingCity: string
  ShippingState: string
  Delivery_Zone__c: string
  RouteId__c?: string
  Scheduled_Delivery_Date__c: number
  Distribution_Center__c: string
  Account: Account
}

export interface Route {
  Id: string
  Name: string
  ScheduledStartTime__c: number
  ScheduledEndTime__c: number
  StartLocationAddress__c: string
  StartLocationCoordinates__Latitude__s: Number
  StartLocationCoordinates__Longitude__s: Number
  EndLocationAddress__c: string
  EndLocationCoordinates__Latitude__s: Number
  EndLocationCoordinates__Longitude__s: Number
  RouteStops__r?: RouteStop[]
}

export interface RouteStop {
  Id?: string
  EstimatedArrivalTime__c: number
  EstimatedDepartureTime__c: number
  LocationCoordinates__Latitude__s: Number
  LocationCoordinates__Longitude__s: Number
  Order__c: String
  Order__r: Order
  AdditionalOrder1__c?: String
  AdditionalOrder1__r?: Order
  AdditionalOrder2__c?: String
  AdditionalOrder2__r?: Order
  TurnByTurnDirections?: string
}

export interface Geolocation {
  Latitude: number
  Longitude: number
}

export interface Account {
  Name: string
  DBA__c: string
  ID: string
}

export interface DistributionCenter {
  Id: string
  Name: string
  Address__c: string
  City_State_Zip__c: string
}
