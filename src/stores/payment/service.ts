import { PaymentApiService } from '@/services'
import { AxiosError } from 'axios'
import { MessageError } from '../interfaces'
import { store } from '../store'
import { PaymentResponse } from './interfaces'

export class PaymentService {
  private static _instance: PaymentService
  // private dispatch: typeof store.dispatch
  private state: typeof store.getState

  public static get instance(): PaymentService {
    if (!PaymentService._instance) {
      PaymentService._instance = new PaymentService()
    }
    return PaymentService._instance
  }

  constructor() {
    // this.dispatch = store.dispatch
    this.state = store.getState
  }

  public async getOne(): Promise<PaymentResponse | void> {
    const data = this.state().payment
    const paymentId = data.information?.paymentId
    console.log(paymentId)
    try {
      if (!paymentId)
        return {
          navigate: '/',
        }
      const { data } = await PaymentApiService.instance.getOne({ paymentId })
      console.log(data)
      // this.dispatch(setInformation(data))
    } catch (e) {
      if (e instanceof AxiosError) {
        const data: MessageError = e.response?.data
        return { message: data.message }
      }
      throw new Error(e as string)
    }
  }
}
