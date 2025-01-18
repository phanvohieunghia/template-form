import { z } from 'zod'

export const giayToSchema = z.object({
  giayToId: z.string(),
  thanhPhanHoSoId: z.string(),
  tenGiayTo: z.string(),
  soLuongBanChinh: z.number(),
  soLuongBanSao: z.number()
})

export type giayToType = z.infer<typeof giayToSchema>
