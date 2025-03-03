import { AxiosError } from 'axios'
import { MessageError } from '../interfaces'
import { store } from '../store'
import { setExample } from './store'
import { CodeTaxApiService } from '@/services'

export class CodeTaxService {
  private static _instance: CodeTaxService
  private dispatch: typeof store.dispatch
  public static get instance(): CodeTaxService {
    if (!CodeTaxService._instance) {
      CodeTaxService._instance = new CodeTaxService()
    }
    return CodeTaxService._instance
  }

  constructor() {
    this.dispatch = store.dispatch
  }

  // public async getOne(params: Record<string, unknown>): Promise<unknown | void> {
  public async getOne(params: Record<string, unknown>): Promise<unknown | void> {
    try {
      const data = await CodeTaxApiService.instance.getOne(params)
      this.dispatch(setExample(data))
    } catch (e) {
      if (e instanceof AxiosError) {
        const data: MessageError = e.response?.data
        return { message: data.message }
      }
      throw new Error(e as string)
    }
  }
}
