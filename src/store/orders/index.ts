import Vue from 'vue'
import salesforce, { Order } from '@/services/salesforce'
import zones from '@/store/zones'
import directions from '@/store/directions'
import { DateTime } from 'luxon'
import distribution from '../distribution'

export interface State {
  orders: Order[]
  ordersLoadRequest: Promise<Order[]> | null
  ordersLoadError: Error | null
  dateFilter: DateTime
  zoneFilter: string
}

export class OrdersStore {
  private readonly defaultZoneFilter: string = 'All Zones'

  public readonly state = Vue.observable<State>({
    orders: [],
    ordersLoadRequest: null,
    ordersLoadError: null,
    dateFilter: DateTime.local().plus({ days: 2 }).startOf('day'),
    zoneFilter: this.defaultZoneFilter,
  })

  public load = async () => {
    try {
      const request = salesforce.getOrders()

      this.onLoadRequest(request)
      this.onLoadSuccess(await request)
    } catch (e) {
      this.onLoadFailure(e)
    }
  }

  public add = (order: Order) => {
    this.state.orders.push(order)
  }

  public remove = (order: Order) => {
    const index = this.state.orders.indexOf(order)

    this.state.orders = [
      ...this.state.orders.slice(0, index),
      ...this.state.orders.slice(index + 1),
    ]
  }

  public updateDateFilter = (value: DateTime) => {
    this.state.dateFilter = value
  }

  public updateZoneFilter = (value: string) => {
    this.state.zoneFilter = value
  }

  private onLoadRequest = (request: Promise<Order[]>) => {
    this.state.ordersLoadRequest = request
    this.state.ordersLoadError = null
  }

  private onLoadSuccess = (orders: Order[]) => {
    this.state.ordersLoadRequest = null
    this.state.orders = orders
  }

  private onLoadFailure = (error: Error) => {
    this.state.ordersLoadRequest = null
    this.state.ordersLoadError = error
  }
  
  get orders () {
    return this.state.orders.filter(this.orderFilter)
  }

  private orderFilter = (order: Order) => {
    if (distribution.state.centerSelected && order.Distribution_Center__c !== distribution.state.centerSelected.Id) {
      return false
    }
    
    // WARNING: Scheduled_Delivery_Date__c is a Date object in Salesforce that doesn't properly get converted to UTC. We have to match the shittiness by subtracting a day
    if (!isNaN(order.Scheduled_Delivery_Date__c) && DateTime.fromMillis(order.Scheduled_Delivery_Date__c).toISO() !== this.state.dateFilter.minus({ days: 1}).toISO()) {
      return false
    }

    if (this.state.zoneFilter && this.state.zoneFilter !== this.defaultZoneFilter && order.Delivery_Zone__c !== this.state.zoneFilter) {
      return false
    }

    return true
  }

  public getAddressFromOrder = (order: Order) => {
    return order.ShippingStreet + ' ' + order.ShippingCity + ', ' + order.ShippingState
  }

  get zones () {
    return this.state.orders.reduce((zones, order) => {
      if (zones.indexOf(order.Delivery_Zone__c) === -1) {
        zones.push(order.Delivery_Zone__c)
      }

      return zones
    }, [this.defaultZoneFilter])
  }

  get dateFilterISO () {
    return this.state.dateFilter.minus({ days: 1 }).toISO()
  }

}

export default new OrdersStore()