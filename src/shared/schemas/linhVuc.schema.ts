import { z } from 'zod'
import { Pagination, PaginationDataRes } from './pagination.schema'

// Get linhVucs query
export const GetLinhVucsQuery = Pagination.extend({
  search: z.string().optional()
})
export type GetLinhVucsQueryType = z.infer<typeof GetLinhVucsQuery>

export const GetLinhVucsRes = z.object({
  message: z.string(),
  data: PaginationDataRes.extend({
    search: z.string().optional(),
    linhVucs: z.array(
      z.object({
        tenLinhVuc: z.string()
      })
    )
  })
})
export type GetLinhVucsResType = z.infer<typeof GetLinhVucsRes>
