import { z } from 'zod'

import { SessionStatusValues } from '../constants/type'
import { Pagination, PaginationDataRes } from './pagination.schema'
import { thuTucSchema } from './thuTuc.schema'
import { MentorSchema } from './mentor.schema'
import { UserSchema } from './auth.schema'
import { MessageSchema } from './message.schema'
import { PaymentSchema } from './payment.schema'

export const SessionSchema = z.object({
  sessionId: z.string(),
  userId: z.string(),
  mentorId: z.string(),
  thuTucId: z.string(),
  status: z.enum(SessionStatusValues),
  description: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date()
})
export type SessionSchema = z.infer<typeof SessionSchema>

// Create session
export const CreateSessionBody = z.object({
  mentorId: z.string(),
  thuTucId: z.string(),
  description: z.string().optional()
})
export type CreateSessionBodyType = z.infer<typeof CreateSessionBody>

export const CreateSessionRes = z.object({
  message: z.string(),
  data: SessionSchema
})
export type CreateSessionResType = z.infer<typeof CreateSessionRes>

// Get sessions
export const GetSessionsQuery = Pagination.extend({
  search: z.string().optional()
})
export type GetSessionsQueryType = z.infer<typeof GetSessionsQuery>

export const GetSessionsRes = z.object({
  message: z.string(),
  data: PaginationDataRes.extend({
    search: z.string().optional(),
    sessions: z.array(
      SessionSchema.extend({
        thuTuc: thuTucSchema.pick({ thuTucId: true, tenThuTuc: true }),
        mentor: MentorSchema.pick({
          mentorId: true,
          userId: true
        }).extend({
          user: UserSchema.pick({
            name: true,
            email: true,
            avatar: true
          })
        })
      })
    )
  })
})
export type GetSessionsResType = z.infer<typeof GetSessionsRes>

// Get messages in session
export const GetMessagesInSessionQuery = Pagination.extend({
  search: z.string().optional()
})
export type GetMessagesInSessionQueryType = z.infer<typeof GetMessagesInSessionQuery>

export const GetMessagesInSessionRes = z.object({
  message: z.string(),
  data: PaginationDataRes.extend({
    search: z.string().optional(),
    messages: z.array(
      MessageSchema.extend({
        payment: PaymentSchema.pick({
          paymentId: true,
          status: true
        }).nullable()
      })
    )
  })
})
export type GetMessagesInSessionResType = z.infer<typeof GetMessagesInSessionRes>
