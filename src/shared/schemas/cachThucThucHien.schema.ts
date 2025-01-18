import { z } from 'zod'

export const cachThucThucHienSchema = z.object({
  id: z.number(),
  thuTucId: z.string(),
  hinhThucNop: z.string().nullable(),
  thoiHanGiaiQuyet: z.string().nullable(),
  lePhi: z.string().nullable(),
  moTa: z.string().nullable()
})

export type cachThucThucHienType = z.infer<typeof cachThucThucHienSchema>
