import { z } from 'zod'
import { PaymentSchema } from './payment.schema'

export const MessageSchema = z.object({
  messageId: z.string(),
  sessionId: z.string(),
  senderId: z.string(),
  content: z.string().nullable(),
  fileUrl: z.string().nullable(),
  fromUser: z.boolean(),
  createdAt: z.date()
})
export type MessageType = z.infer<typeof MessageSchema>

export const MessageParams = z.object({
  messageId: z.string()
})
export type MessageParamsType = z.infer<typeof MessageParams>

export const CreateMessageBody = z.object({
  sessionId: z.string(),
  content: z.string().nullable(),
  fileUrl: z.string().nullable()
})
export type CreateMessageBodyType = z.infer<typeof CreateMessageBody>

export const CreateMessageRes = z.object({
  message: z.string(),
  data: MessageSchema.extend({
    payment: PaymentSchema.nullable().optional()
  })
})
export type CreateMessageResType = z.infer<typeof CreateMessageRes>

// Get message
export const GetMessageRes = z.object({
  message: z.string(),
  data: MessageSchema.extend({
    payment: PaymentSchema.nullable().optional()
  })
})
export type GetMessageResType = z.infer<typeof GetMessageRes>
