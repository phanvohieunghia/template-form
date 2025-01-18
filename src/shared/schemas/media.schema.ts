import { z } from 'zod'

export const UploadSingleRes = z.object({
  message: z.string(),
  data: z.object({
    url: z.string(),
    name: z.string()
  })
})
export type UploadSingleResType = z.infer<typeof UploadSingleRes>

export const UploadMultipleRes = z.object({
  message: z.string(),
  data: z.array(
    z.object({
      url: z.string(),
      name: z.string()
    })
  )
})
export type UploadMultipleResType = z.infer<typeof UploadMultipleRes>
