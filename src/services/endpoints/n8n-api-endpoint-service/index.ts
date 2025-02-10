import { appConfig } from '@/configs'

export class N8nApiEndpointService {
  protected endpoint: string
  constructor() {
    this.endpoint = appConfig.n8nApiUrl
  }
}
