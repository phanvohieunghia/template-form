import { ApiEndpointService } from '@/services/endpoints'
import { HttpClientService } from '@/services/https'
import { GetAllExpertResponse, GetAllExpertVariables } from '@/stores/expert/interfaces'

export class UploadedFileApiService extends ApiEndpointService {
  private static _instance: UploadedFileApiService

  public static get instance(): UploadedFileApiService {
    if (!UploadedFileApiService._instance) {
      UploadedFileApiService._instance = new UploadedFileApiService()
    }
    return UploadedFileApiService._instance
  }
  constructor() {
    super()
    this.endpoint = `${this.endpoint}/upload-files`
  }

  public async uploadOneFile(params?: GetAllExpertVariables): Promise<GetAllExpertResponse> {
    const endpoint = this.endpoint
    return await HttpClientService.post(endpoint, { params })
  }
}
