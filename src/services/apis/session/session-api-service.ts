import { ApiEndpointService } from '@/services/endpoints'
import { HttpClientService } from '@/services/https'
import { GetAllExpertResponse, GetAllExpertVariables } from '@/stores/expert/interfaces'

export class SessionApiService extends ApiEndpointService {
  private static _instance: SessionApiService

  public static get instance(): SessionApiService {
    if (!SessionApiService._instance) {
      SessionApiService._instance = new SessionApiService()
    }
    return SessionApiService._instance
  }
  constructor() {
    super()
    this.endpoint = `${this.endpoint}/sessions`
  }

  public async CreateOneSession(params?: GetAllExpertVariables): Promise<GetAllExpertResponse> {
    const endpoint = this.endpoint
    return await HttpClientService.get(endpoint, { params })
  }
}
