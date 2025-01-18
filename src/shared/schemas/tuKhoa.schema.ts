import { z } from 'zod'

export const tuKhoaSchema = z.object({
  id: z.string(),
  thuTucId: z.string(),
  tuKhoa: z.string()
})

export type tuKhoaType = z.infer<typeof tuKhoaSchema>
