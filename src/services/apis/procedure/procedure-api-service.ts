import { ApiEndpointService } from '@/services/endpoints'
import { HttpClientService } from '@/services/https'
import { GetAllProcedureVariables, GetAllThuTucResponse, GetOneThuTucResponse, GetOneVariables } from '@/stores/procedure/interfaces'

export class ProcedureApiService extends ApiEndpointService {
  private static _instance: ProcedureApiService

  public static get instance(): ProcedureApiService {
    if (!ProcedureApiService._instance) {
      ProcedureApiService._instance = new ProcedureApiService()
    }
    return ProcedureApiService._instance
  }
  constructor() {
    super()
    this.endpoint = `${this.endpoint}/thu-tucs`
  }

  public async getAll(params?: GetAllProcedureVariables): Promise<GetAllThuTucResponse> {
    const endpoint = this.endpoint
    return await HttpClientService.get(endpoint, { params })
  }

  public async getOne(params: GetOneVariables): Promise<GetOneThuTucResponse> {
    const endpoint = `${this.endpoint}/${params.id}`
    return await HttpClientService.get(endpoint, { params })
  }
}
