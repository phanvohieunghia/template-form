import { getThuTucsResType, thuTucType } from '@/shared/schemas/thuTuc.schema'

export type ProcedureResponse = {
  data?: ProcedureData
  error?: Error
  [key: string]: unknown
}

export type ThuTucUI = Pick<ThuTuc, 'maThuTuc' | 'tenThuTuc' | 'linhVuc' | 'loaiThuTuc' | 'thuTucId'>

export type ProcedureData = {
  total: number
  rows: ThuTucUI[] | undefined
}

export type ThuTuc = thuTucType

export type GetAllThuTucResponse = getThuTucsResType

export type ProcedureError = {
  message: string
  name: string
}

export type GetListParamsVariables = {
  search?: string
  page?: number
  limit?: number
}
