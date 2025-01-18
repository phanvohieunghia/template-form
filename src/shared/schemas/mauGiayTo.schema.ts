import { z } from 'zod'

export const mauGiayToSchema = z.object({
  mauGiayToId: z.string(),
  mauGiayToIdDVC: z.string(),
  tenMauGiayTo: z.string(),
  linkMauGiayTo: z.string().nullable(),
  giayToId: z.string(),
  isCustom: z.boolean()
})

export type mauGiayToType = z.infer<typeof mauGiayToSchema>
