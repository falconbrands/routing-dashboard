import Vue from 'vue'

export interface State {
  isSaveModalActive: boolean
}

export class UIStore {
  public readonly state = Vue.observable<State>({
    isSaveModalActive: false,
  })

  public toggleSaveModal = (value: boolean = !this.state.isSaveModalActive) => {
    this.state.isSaveModalActive = value
  }

}

export default new UIStore()