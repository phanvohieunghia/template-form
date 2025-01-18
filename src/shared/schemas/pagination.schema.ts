import z from 'zod'

export const Pagination = z.object({
  limit: z.string().trim().optional(),
  page: z.string().trim().optional()
})

export type PaginationType = z.TypeOf<typeof Pagination>

export const PaginationDataRes = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  pageSize: z.number()
})

export type PaginationDataResType = z.TypeOf<typeof PaginationDataRes>
