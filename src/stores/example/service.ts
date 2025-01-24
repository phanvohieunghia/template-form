import { ExampleApiService } from '@/services/apis/example'
import { AxiosError } from 'axios'
import { MessageError } from '../interfaces'
import { store } from '../store'
import { setExample } from './store'

export class ExampleService {
  private static _instance: ExampleService
  private dispatch: typeof store.dispatch
  public static get instance(): ExampleService {
    if (!ExampleService._instance) {
      ExampleService._instance = new ExampleService()
    }
    return ExampleService._instance
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
        return { message: data.message }
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
}
