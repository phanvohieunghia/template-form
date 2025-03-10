import { getThuTucResType, getThuTucsResType, thuTucItem, thuTucType } from '@/shared/schemas/thuTuc.schema'
import { z } from 'zod'

type ThuTuc = thuTucType

export type ThuTucUI = Pick<ThuTuc, 'maThuTuc' | 'tenThuTuc' | 'linhVuc' | 'loaiThuTuc' | 'thuTucId'>

type ThuTucDetail = z.infer<typeof thuTucItem>

export type ProcedureDetailUI = ThuTucDetail

export type ProcedureList = {
  total: number
  rows: ThuTucUI[] | undefined
}

export type ProcedureResponse = {
  data?: ProcedureList
  error?: Error
  [key: string]: unknown
}

export type GetAllProcedureVariables = {
  search?: string
  page?: number
  limit?: number
}
export type GetAllThuTucResponse = getThuTucsResType

export type GetOneVariables = {
  id: string
}
export type GetOneThuTucResponse = getThuTucResType
