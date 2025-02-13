import { N8nApiEndpointService } from '@/services/endpoints'
import { HttpClientService } from '@/services/https'
import { ChatOneResponse, ChatOneVariables } from '@/stores/chat/interfaces'

export class ChatApiService extends N8nApiEndpointService {
  private static _instance: ChatApiService

  public static get instance(): ChatApiService {
    if (!ChatApiService._instance) {
      ChatApiService._instance = new ChatApiService()
    }
    return ChatApiService._instance
  }
  constructor() {
    super()
    this.endpoint = `${this.endpoint}`
  }

  public async chatOne(data: ChatOneVariables): Promise<ChatOneResponse> {
    const endpoint = this.endpoint
    return await HttpClientService.post(endpoint, data, { timeout: 30 * 1000 })
  }
}
