import { z } from 'zod'

export const thanhPhanHoSoSchema = z.object({
  thanhPhanHoSoId: z.string(),
  thuTucId: z.string(),
  tenThanhPhan: z.string()
})
