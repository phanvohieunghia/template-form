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
