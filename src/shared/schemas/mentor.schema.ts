import { z } from 'zod'

import { StatusMentorValues } from '../constants/type'
import { Pagination, PaginationDataRes } from './pagination.schema'
import { RegisterBody, UserSchema } from './auth.schema'

// Schema for Mentor
export const MentorSchema = z.object({
  mentorId: z.string(),
  userId: z.string(),
  expertise: z.string(),
  rating: z.number(),
  status: z.enum(StatusMentorValues)
})
export type MentorType = z.infer<typeof MentorSchema>

// Get all mentors
export const GetAllMentorsQuery = Pagination.extend({
  search: z.string().optional()
})
export type GetAllMentorsQueryType = z.infer<typeof GetAllMentorsQuery>

export const GetAllMentorsRes = z.object({
  message: z.string(),
  data: PaginationDataRes.extend({
    search: z.string().optional(),
    mentors: z.array(
      MentorSchema.extend({
        user: UserSchema.pick({ name: true, email: true, phone: true, avatar: true })
      })
    )
  })
})
export type GetAllMentorsResType = z.infer<typeof GetAllMentorsRes>

// Create mentor
export const CreateMentorBody = RegisterBody

export type CreateMentorBodyType = z.infer<typeof CreateMentorBody>

export const CreateMentorRes = z.object({
  message: z.string(),
  data: MentorSchema
})
export type CreateMentorResType = z.infer<typeof CreateMentorRes>
