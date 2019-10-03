const GoogleMapsLoader = require('google-maps')
GoogleMapsLoader.KEY = 'AIzaSyBZwSsrOo-uykzGBKiLBTERhCSF_Zq0hLA'

export class MapService {
  private map!: google.maps.Map
  private directions!: google.maps.DirectionsService
  private renderer!: google.maps.DirectionsRenderer

  public initialize = async (element: Element, options: google.maps.MapOptions = {}) => {
    await this.load()

    this.map = new google.maps.Map(element, {
      center: {
        lat: 41.75419727275275,
        lng: -123.91978897841702,
      },
      zoom: 5,
      ...options
    })

    this.directions = new google.maps.DirectionsService()
    this.renderer = new google.maps.DirectionsRenderer()

    this.renderer.setMap(this.map)
  }

  public getDirections = (request: google.maps.DirectionsRequest) => new Promise<google.maps.DirectionsResult>((resolve, reject) => {
    this.directions.route(request, (response, status) => {
      // TODO: check for success
      this.renderer.setDirections(response)
      resolve(response)
    })
  })

  public clear = () => {
    if (!!this.renderer) {
      this.renderer.set('directions', null)
    }
  }

  public load = () => new Promise((resolve) => {
    GoogleMapsLoader.load(resolve)
  })

}

export default new MapService()