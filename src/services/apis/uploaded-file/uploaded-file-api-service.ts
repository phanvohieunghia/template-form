import { ApiEndpointService } from '@/services/endpoints'
import { HttpClientService } from '@/services/https'
import { CONTENT_TYPE } from '@/services/https/httpConfig'
import { UploadOneFileResponse, UploadOneFileVariables } from './interfaces'

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

  public async uploadOneFile(data?: UploadOneFileVariables): Promise<UploadOneFileResponse> {
    const endpoint = this.endpoint
    return await HttpClientService.post(endpoint, data, { headers: { 'Content-Type': CONTENT_TYPE.FORM_DATA } })
  }
}
