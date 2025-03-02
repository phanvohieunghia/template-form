import { ApiEndpointService } from '@/services/endpoints'
import { HttpClientService } from '@/services/https'

export class NewsApiService extends ApiEndpointService {
  private static _instance: NewsApiService

  public static get instance(): NewsApiService {
    if (!NewsApiService._instance) {
      NewsApiService._instance = new NewsApiService()
    }
    return NewsApiService._instance
  }
  constructor() {
    super()
    this.endpoint = `${this.endpoint}/news`
  }

  public async getAll(params?: Record<string, unknown>): Promise<unknown> {
    const endpoint = this.endpoint
    return await HttpClientService.get(endpoint, { params })
  }

  public async getOne(params?: Record<string, unknown>): Promise<unknown> {
    const endpoint = this.endpoint
    return await HttpClientService.get(endpoint, { params })
  }
}
