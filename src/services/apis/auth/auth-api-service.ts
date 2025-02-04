import { ApiEndpointService } from '@/services/endpoints'
import { HttpClientService } from '@/services/https'
import { LoginResponse } from '@/stores/auth/interfaces'
import { LoginVariables } from '@/validations'

export class AuthApiService extends ApiEndpointService {
  private static _instance: AuthApiService

  public static get instance(): AuthApiService {
    if (!AuthApiService._instance) {
      AuthApiService._instance = new AuthApiService()
    }
    return AuthApiService._instance
  }
  constructor() {
    super()
    this.endpoint = `${this.endpoint}/auth`
  }

  public async getAll(params?: Record<string, unknown>): Promise<unknown> {
    const endpoint = this.endpoint
    return await HttpClientService.get(endpoint, { params })
  }

  public async getOne(params?: Record<string, unknown>): Promise<unknown> {
    const endpoint = this.endpoint
    return await HttpClientService.get(endpoint, { params })
  }

  public async login(data: LoginVariables): Promise<LoginResponse> {
    const endpoint  = `${this.endpoint}/login`
    return await HttpClientService.post(endpoint, data)
  }

  public logout() {
 
  }

  public register() {}
}
