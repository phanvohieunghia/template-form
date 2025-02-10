import { LocalStorageService } from '@/services'
import { AuthApiService } from '@/services/apis/auth'
import { LOCAL_STORAGE, ROUTE_NAME } from '@/utils'
import { LoginVariables } from '@/validations'
import { AxiosError } from 'axios'
import { MessageError } from '../interfaces'
import { store } from '../store'
import {
  AuthResponse,
  ForgotPasswordVariables,
  RegisterVariables,
  ResetPasswordVariables,
  SuccessResponse,
  VerifyForgotPasswordVariables,
} from './interfaces'
import { setForgotPasswordToken } from './store'

export class AuthService {
  private static _instance: AuthService
  private dispatch: typeof store.dispatch
  private state: typeof store.getState
  public static get instance(): AuthService {
    if (!AuthService._instance) {
      AuthService._instance = new AuthService()
    }
    return AuthService._instance
  }

  constructor() {
    this.dispatch = store.dispatch
    this.state = store.getState
  }

  public async login(params: LoginVariables): Promise<SuccessResponse | AuthResponse> {
    try {
      const { data } = await AuthApiService.instance.login(params)
      LocalStorageService.instance.set(LOCAL_STORAGE.ACCESS_TOKEN, data.accessToken)
      LocalStorageService.instance.set(LOCAL_STORAGE.REFRESH_TOKEN, data.refreshToken)
      return {
        success: true,
        redirectTo: ROUTE_NAME.HOME,
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        const data: MessageError = e.response?.data
        return { success: false, message: data.message }
      }
      throw new Error(e as string)
    }
  }

  public async register(params: RegisterVariables): Promise<SuccessResponse | AuthResponse> {
    try {
      await AuthApiService.instance.register(params)
      return {
        success: true,
        redirectTo: ROUTE_NAME.HOME,
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        const data: MessageError = e.response?.data
        return { success: false, message: data.message }
      }
      throw new Error(e as string)
    }
  }

  public async logout(): Promise<SuccessResponse | AuthResponse> {
    try {
      const refreshToken = LocalStorageService.instance.get<string>(LOCAL_STORAGE.REFRESH_TOKEN)
      const response = await AuthApiService.instance.logout({ refreshToken: refreshToken ?? '' })
      if (response.message === 'Logout success') {
        LocalStorageService.instance.clear()
        return { success: true, redirectTo: ROUTE_NAME.LOGIN_ }
      }
      return { success: false, redirectTo: null, message: 'Logout failed' }
    } catch (e) {
      if (e instanceof AxiosError) {
        const data: MessageError = e.response?.data
        if (data.message === 'Không tìm thấy dữ liệu') LocalStorageService.instance.clear()
        return { success: false, message: data.message }
      }
      throw new Error(e as string)
    }
  }

  public async forgotPassword(data: ForgotPasswordVariables): Promise<SuccessResponse | AuthResponse> {
    try {
      const response = await AuthApiService.instance.forgotPassword(data)
      return { success: true, message: response.message }
    } catch (e) {
      if (e instanceof AxiosError) {
        const data: MessageError = e.response?.data
        return { success: false, message: data.message }
      }
      throw new Error(e as string)
    }
  }

  public async resetPassword(data: ResetPasswordVariables): Promise<SuccessResponse | AuthResponse> {
    try {
      const response = await AuthApiService.instance.resetPassword({ ...data, forgotPasswordToken: this.state().auth.forgotPasswordToken })
      return { success: true, message: response.message }
    } catch (e) {
      if (e instanceof AxiosError) {
        const data: MessageError = e.response?.data
        return { success: false, message: data.message }
      }
      throw new Error(e as string)
    }
  }

  public async verifyForgotPassword(data: VerifyForgotPasswordVariables): Promise<SuccessResponse | AuthResponse> {
    try {
      this.dispatch(setForgotPasswordToken(data.forgotPasswordToken))
      const response = await AuthApiService.instance.verifyForgotPassword(data)
      return { success: true, message: response.message }
    } catch (e) {
      if (e instanceof AxiosError) {
        const data: MessageError = e.response?.data
        return { success: false, message: data.message }
      }
      throw new Error(e as string)
    }
  }
}
