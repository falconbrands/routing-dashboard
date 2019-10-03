import Vue from 'vue'
import salesforce from '@/services/salesforce'

export interface State {
  zones: string[]
  zoneSelected: string | null
  zonesLoadRequest: Promise<string[]> | null
  zonesLoadError: Error | null
  zoneIndex: number | null
}

export class ZonesStore {
  public readonly state = Vue.observable<State>({
    zones: [],
    zoneSelected: null,
    zonesLoadRequest: null,
    zonesLoadError: null,
    zoneIndex: null,
  })

  public readonly fallbackZoneLabel: string = 'All Zones'

  public load = async () => {
    try {
      const request = salesforce.getDistributionZones()

      this.onLoadRequest(request)
      this.onLoadSuccess(await request)
    } catch (e) {
      this.onLoadFailure(e)
    }
  }

  public updateZoneSelected = (value: string) => {
    this.state.zoneSelected = value
  }

  private onLoadRequest = (request: Promise<string[]>) => {
    this.state.zonesLoadRequest = request
    this.state.zonesLoadError = null
  }

  private onLoadSuccess = (zones: string[]) => {
    this.state.zonesLoadRequest = null
    this.state.zones = [this.fallbackZoneLabel].concat(zones)
    this.state.zoneSelected = this.state.zones[0]
  }

  private onLoadFailure = (error: Error) => {
    this.state.zonesLoadRequest = null
    this.state.zonesLoadError = error
  }

  // get currentZone () {
  //   return this.state.zoneIndex !== null ? this.state.zones[this.state.zoneIndex] : null
  // }

  // get zones () {
  //   return ['All Zones'].concat(this.state.zones)
  // }

}

export default new ZonesStore()