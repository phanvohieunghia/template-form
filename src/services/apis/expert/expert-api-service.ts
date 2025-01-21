import { ApiEndpointService } from '@/services/endpoints'
import { HttpClientService } from '@/services/https'
import { GetAllExpertResponse, GetAllExpertVariables } from '@/stores/expert/interfaces'

export class ExpertApiService extends ApiEndpointService {
  private static _instance: ExpertApiService

  public static get instance(): ExpertApiService {
    if (!ExpertApiService._instance) {
      ExpertApiService._instance = new ExpertApiService()
    }
    return ExpertApiService._instance
  }
  constructor() {
    super()
    this.endpoint = `${this.endpoint}/mentors`
  }

  public async getAll(params?: GetAllExpertVariables): Promise<GetAllExpertResponse> {
    const endpoint = this.endpoint
    return await HttpClientService.get(endpoint, { params })
  }
}
