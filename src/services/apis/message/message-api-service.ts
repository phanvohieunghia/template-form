import { ApiEndpointService } from '@/services/endpoints'
import { HttpClientService } from '@/services/https'
import { GetAllExpertResponse, GetAllExpertVariables } from '@/stores/expert/interfaces'

export class MessageApiService extends ApiEndpointService {
  private static _instance: MessageApiService

  public static get instance(): MessageApiService {
    if (!MessageApiService._instance) {
      MessageApiService._instance = new MessageApiService()
    }
    return MessageApiService._instance
  }
  constructor() {
    super()
    this.endpoint = `${this.endpoint}/messages`
  }

  public async createOneMessage(params?: GetAllExpertVariables): Promise<GetAllExpertResponse> {
    const endpoint = this.endpoint
    return await HttpClientService.post(endpoint, { params })
  }
}
