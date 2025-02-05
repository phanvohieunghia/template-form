import { ApiEndpointService } from '@/services/endpoints'
import { HttpClientService } from '@/services/https'
import { LoginResponse, LogoutResponse, LogoutVariables, RegisterResponse, RegisterVariables } from '@/stores/auth/interfaces'
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

  public async login(data: LoginVariables): Promise<LoginResponse> {
    const endpoint = `${this.endpoint}/login`
    return await HttpClientService.post(endpoint, data)
  }

  public register(data: RegisterVariables): Promise<RegisterResponse> {
    const endpoint = `${this.endpoint}/register`
    return HttpClientService.post(endpoint, data)
  }

  public logout(data: LogoutVariables): Promise<LogoutResponse> {
    const endpoint = `${this.endpoint}/logout`
    return HttpClientService.post(endpoint, data)
  }
}
