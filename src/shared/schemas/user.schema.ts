import { z } from 'zod'

import { UserProfileSchema } from './auth.schema'

export const getMeRes = z.object({
  message: z.string(),
  data: UserProfileSchema
})
export type getMeResType = z.infer<typeof getMeRes>
