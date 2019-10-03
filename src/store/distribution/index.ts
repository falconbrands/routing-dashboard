import Vue from 'vue'
import salesforce, { DistributionCenter } from '@/services/salesforce'
import directions from '@/store/directions'

export interface State {
  centers: DistributionCenter[]
  centerSelected: DistributionCenter | null
  centersLoadRequest: Promise<DistributionCenter[]> | null
  centersLoadError: Error | null
}

export class DistributionStore {
  public readonly state = Vue.observable<State>({
    centers: [],
    centerSelected: null,
    centersLoadRequest: null,
    centersLoadError: null,
  })

  public load = async () => {
    try {
      const request = salesforce.getDistributionCenters()

      this.onLoadRequest(request)
      this.onLoadSuccess(await request)
    } catch (e) {
      this.onLoadFailure(e)
    }
  }

  private onLoadRequest = (request: Promise<DistributionCenter[]>) => {
    this.state.centersLoadRequest = request
    this.state.centersLoadError = null
  }

  private onLoadSuccess = (centers: DistributionCenter[]) => {
    this.state.centersLoadRequest = null
    this.state.centers = centers
    this.state.centerSelected = centers[0]
  }

  private onLoadFailure = (error: Error) => {
    this.state.centersLoadRequest = null
    this.state.centersLoadError = error
  }

  public updateSelectedCenter = (center: DistributionCenter) => {
    this.state.centerSelected = center
  }

  public getAddressFromCenter = (center: DistributionCenter) => {
    if (!center.City_State_Zip__c) {
      return center.Address__c
    }

    return center.Address__c + ' ' + center.City_State_Zip__c
  }

}

export default new DistributionStore()