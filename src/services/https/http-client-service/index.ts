import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios'
import { DEFAULT_HEADERS, DEFAULT_TIMEOUT } from '../httpConfig'

export class HttpClientService {
  private static _instance: AxiosInstance

  public static get instance(): AxiosInstance {
    if (!HttpClientService._instance) {
      HttpClientService._instance = this.create()
    }
    return this._instance
  }

  private static create() {
    const defaultConfig: CreateAxiosDefaults = {
      timeout: DEFAULT_TIMEOUT,
      headers: DEFAULT_HEADERS,
    }
    const instance = axios.create(defaultConfig)
    instance.interceptors.request.use(
      (response) => response,
      async (error) => this.handleResponseError(error),
    )
    return instance
  }
  /* eslint-disable */
  private static async handleResponseError(error: any): Promise<AxiosResponse> {
    if (error.response) {
      const { status, data } = error.response
      switch (status) {
        case 400:
          throw new Error(data.message)
        case 401:
          throw new Error(data.message)
        case 403:
          throw new Error(data.message)
        case 404:
          throw new Error(data.message)
        case 409:
          throw new Error(data.message)
        default:
          throw new Error(data.message)
      }
    } else {
      return {
        data: { error: 'Request failed', details: error.message },
        status: error.response ? error.response.status : 500,
        statusText: error.response ? error.response.statusText : 'Internal Server Error',
        headers: error.response ? error.response.headers : {},
        config: error.config,
        request: error.request,
      }
    }
  }

  public static async get<T>(uri: string, options?: AxiosRequestConfig): Promise<T> {
    const config = await this.getConfig(options)
    const response: AxiosResponse = await this.instance.get<T>(uri, config)
    return response.data
  }

  public static async post<T>(uri: string, data: unknown, options?: AxiosRequestConfig): Promise<T> {
    const config = await this.getConfig(options)
    const response = await this.instance.post<T>(uri, data, config)
    return response.data as T
  }

  public static async put<T>(uri: string, data: unknown, options?: AxiosRequestConfig): Promise<T> {
    const config = await this.getConfig(options)
    const response = await this.instance.put<T>(uri, data, config)
    return response.data as T
  }

  public static async delete<T>(uri: string, options?: AxiosRequestConfig): Promise<T> {
    const config = await this.getConfig(options)
    const response = await this.instance.delete<T>(uri, config)
    return response.data as T
  }
  /* eslint-enable */

  private static async getConfig(customOptions?: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    const { data, params, ...remaining } = customOptions ?? {}
    const defaultConfig: AxiosRequestConfig = {
      data,
      params,
      ...remaining,
    }
    return defaultConfig
  }
}
