import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import * as types from './types'

export class SamsaraService {
  private client: AxiosInstance

  constructor () {
    this.client = axios.create({
      baseURL: 'https://api.samsara.com/v1/',
      headers: {
        'Access-Control-Allow-Headers': '*',
        Authorization: 'Bearer ' + 'IZyhd6j8Wu8D9wmIhv7UxhKK548fUW',
      }
    })
  }

  public createRoute = (route: types.Route) => {
    return this.request({
      url: '/fleet/dispatch/routes',
      method: 'POST',
      data: route,
    })
  }

  public listRoutes = async (): Promise<any[]> => {
    return []
  }

  private request = async <T>(config: AxiosRequestConfig): Promise<T> => {
    const response = await this.client(config)

    return response.data
  }


}

export default new SamsaraService()