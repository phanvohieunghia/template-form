import { ApiEndpointService } from '@/services/endpoints'
import { HttpClientService } from '@/services/https'
import {
  ForgotPasswordResponse,
  LoginResponse,
  LogoutResponse,
  LogoutVariables,
  RegisterResponse,
  RegisterVariables,
  ResetPasswordResponse,
  ResetPasswordVariables,
  VerifyForgotPasswordResponse,
  VerifyForgotPasswordVariables,
} from '@/stores/auth/interfaces'
import { ForgotPasswordVariables, LoginVariables } from '@/validations'

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

  public async register(data: RegisterVariables): Promise<RegisterResponse> {
    const endpoint = `${this.endpoint}/register`
    return await HttpClientService.post(endpoint, data)
  }

  public async logout(data: LogoutVariables): Promise<LogoutResponse> {
    const endpoint = `${this.endpoint}/logout`
    return await HttpClientService.post(endpoint, data)
  }

  public forgotPassword(data: ForgotPasswordVariables): Promise<ForgotPasswordResponse> {
    const endpoint = `${this.endpoint}/forgot-password`
    return HttpClientService.post(endpoint, data)
  }

  public verifyForgotPassword(data: VerifyForgotPasswordVariables): Promise<VerifyForgotPasswordResponse> {
    const endpoint = `${this.endpoint}/verify-forgot-password`
    return HttpClientService.post(endpoint, data)
  }

  public resetPassword(data: ResetPasswordVariables): Promise<ResetPasswordResponse> {
    const endpoint = `${this.endpoint}/reset-password`
    return HttpClientService.patch(endpoint, data)
  }
}
