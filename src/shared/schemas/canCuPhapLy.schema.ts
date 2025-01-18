import { z } from 'zod'

export const canCuPhapLySchema = z.object({
  id: z.number(),
  thuTucId: z.string(),
  soKyHieu: z.string(),
  trichYeu: z.string().nullable(),
  ngayBanHanh: z.string().nullable(),
  coQuanBanHanh: z.string().nullable()
})

export type canCuPhapLyType = z.infer<typeof canCuPhapLySchema>
