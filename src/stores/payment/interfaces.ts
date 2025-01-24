import { GetPaymentResType, PaymentType } from '@/shared/schemas/payment.schema'

export type Payment = PaymentType

export type PaymentResponse = {
  data?: Payment
  error?: Error
  [key: string]: unknown
}

export type GetOneVariables = {
  paymentId: string
}
export type GetOneResponse = GetPaymentResType

export type MomoRedirectUrlVariables = {
  amount: number
  extraData: string
  message: string
  orderId: string
  orderInfo: string
  orderType: string
  partnerCode: string
  payType: string
  requestId: string
  responseTime: number
  resultCode: number
  signature: string
  transId: number
}
