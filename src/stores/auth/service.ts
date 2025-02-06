import { LocalStorageService } from '@/services'
import { AuthApiService } from '@/services/apis/auth'
import { ExampleApiService } from '@/services/apis/example'
import { LOCAL_STORAGE, ROUTE_NAME } from '@/utils'
import { LoginVariables } from '@/validations'
import { AxiosError } from 'axios'
import { MessageError } from '../interfaces'
import { store } from '../store'
import { AuthResponse, RegisterVariables, SuccessResponse } from './interfaces'
import { setExample } from './store'

export class AuthService {
  private static _instance: AuthService
  private dispatch: typeof store.dispatch
  public static get instance(): AuthService {
    if (!AuthService._instance) {
      AuthService._instance = new AuthService()
    }
    return AuthService._instance
  }

  constructor() {
    this.dispatch = store.dispatch
  }

  public async getAll(params?: Record<string, unknown>): Promise<unknown | void> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newParams: any = { limit: 10, page: 1, ...params }
      const data = await ExampleApiService.instance.getAll(newParams)

      this.dispatch(setExample(data))
    } catch (e) {
      if (e instanceof AxiosError) {
        const data: MessageError = e.response?.data
        return { success: false, message: data.message }
      }
      throw new Error(e as string)
    }
  }

  public async getOne(params: Record<string, unknown>): Promise<unknown | void> {
    try {
      const data = await ExampleApiService.instance.getOne(params)
      this.dispatch(setExample(data))
    } catch (e) {
      if (e instanceof AxiosError) {
        const data: MessageError = e.response?.data
        return { message: data.message }
      }
      throw new Error(e as string)
    }
  }

  public async login(params: LoginVariables): Promise<SuccessResponse | AuthResponse> {
    try {
      const { data } = await AuthApiService.instance.login(params)
      LocalStorageService.instance.set(LOCAL_STORAGE.ACCESS_TOKEN, data.accessToken)
      LocalStorageService.instance.set(LOCAL_STORAGE.REFRESH_TOKEN, data.refreshToken)
      return {
        success: true,
        redirectTo: '/',
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
        redirectTo: '/',
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
      console.log(e)
      if (e instanceof AxiosError) {
        const data: MessageError = e.response?.data
        if (data.message === 'Không tìm thấy dữ liệu') LocalStorageService.instance.clear()
        return { success: false, message: data.message }
      }
      throw new Error(e as string)
    }
  }
}
