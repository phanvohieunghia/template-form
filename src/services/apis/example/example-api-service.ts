import { ApiEndpointService } from '@/services/endpoints'
import { HttpClientService } from '@/services/https'

export class ExampleApiService extends ApiEndpointService {
  private static _instance: ExampleApiService

  public static get instance(): ExampleApiService {
    if (!ExampleApiService._instance) {
      ExampleApiService._instance = new ExampleApiService()
    }
    return ExampleApiService._instance
  }
  constructor() {
    super()
    this.endpoint = `${this.endpoint}/example`
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
