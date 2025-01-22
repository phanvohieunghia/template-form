import { z } from 'zod'

import { PaymentStatusValues } from '../constants/type'

// Create a payment
export const CreateMomoPaymentBody = z.object({
  paymentId: z.string(),
  userId: z.string(),
  amount: z.number(),
  description: z.string().nullable(),
  requestType: z.string(),
  status: z.enum(PaymentStatusValues)
})
export type CreateMomoPaymentBodyType = z.infer<typeof CreateMomoPaymentBody>

export const CreateMomoPaymentRes = z.object({
  message: z.string(),
  data: z.object({
    partnerCode: z.string(),
    orderId: z.string(),
    requestId: z.string(),
    amount: z.number(),
    responseTime: z.number(),
    message: z.string(),
    resultCode: z.number(),
    payUrl: z.string(),
    deeplink: z.string().nullable().optional(),
    qrCodeUrl: z.string().nullable().optional()
  })
})
export type CreateMomoPaymentResType = z.infer<typeof CreateMomoPaymentRes>
