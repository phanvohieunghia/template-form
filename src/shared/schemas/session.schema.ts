import { z } from 'zod'

import { SessionStatusValues } from '../constants/type'

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
