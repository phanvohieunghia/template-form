import { appConfig } from '@/configs'

export class ApiEndpointService {
  protected endpoint: string
  constructor() {
    this.endpoint = appConfig.restFullApiUrl
  }
}
