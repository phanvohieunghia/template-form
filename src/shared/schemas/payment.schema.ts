import { z } from 'zod'

import { PaymentStatusValues } from '../constants/type'

export const PaymentSchema = z.object({
  paymentId: z.string(),
  messageId: z.string().nullable(),
  userId: z.string(),
  amount: z.number(),
  status: z.enum(PaymentStatusValues),
  requestId: z.string().nullable(),
  description: z.string().nullable(),
  payUrl: z.string().nullable(),
  deeplink: z.string().nullable(),
  qrCodeUrl: z.string().nullable(),
  createdAt: z.date()
})
export type PaymentType = z.infer<typeof PaymentSchema>
