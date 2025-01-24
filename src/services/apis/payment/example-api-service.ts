import { ApiEndpointService } from '@/services/endpoints'
import { HttpClientService } from '@/services/https'
import { GetOneResponse, GetOneVariables } from '@/stores/payment'

export class PaymentApiService extends ApiEndpointService {
  private static _instance: PaymentApiService

  public static get instance(): PaymentApiService {
    if (!PaymentApiService._instance) {
      PaymentApiService._instance = new PaymentApiService()
    }
    return PaymentApiService._instance
  }
  constructor() {
    super()
    this.endpoint = `${this.endpoint}/payments`
  }

  public async getOne(params: GetOneVariables): Promise<GetOneResponse> {
    const endpoint = `${this.endpoint}/${params.paymentId}`
    return await HttpClientService.get(endpoint, { params })
  }
}
