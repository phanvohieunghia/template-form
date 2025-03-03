import { ApiEndpointService } from '@/services/endpoints'
import { HttpClientService } from '@/services/https'
import { GetOneCodeTaxResponse } from '@/stores/code-tax/interfaces'

export class CodeTaxApiService extends ApiEndpointService {
  private static _instance: CodeTaxApiService

  public static get instance(): CodeTaxApiService {
    if (!CodeTaxApiService._instance) {
      CodeTaxApiService._instance = new CodeTaxApiService()
    }
    return CodeTaxApiService._instance
  }
  constructor() {
    super()
    this.endpoint = 'https://api.vietqr.io/v2'
  }

  public async getOne(id: string | unknown): Promise<GetOneCodeTaxResponse> {
    const endpoint = this.endpoint + `/business/${id}`
    return await HttpClientService.get(endpoint)
  }
}
