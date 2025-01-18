import { z } from 'zod'
import { Pagination, PaginationDataRes } from './pagination.schema'
import { cachThucThucHienSchema } from './cachThucThucHien.schema'
import { thanhPhanHoSoSchema } from './thanhPhanHoSo.schema'
import { giayToSchema } from './giayTo.schema'
import { mauGiayToSchema } from './mauGiayTo.schema'

export const thuTucSchema = z.object({
  thuTucId: z.string(),
  maThuTuc: z.string(),
  soQuyetDinh: z.string().nullable(),
  tenThuTuc: z.string(),
  capThucHien: z.string().nullable(),
  loaiThuTuc: z.string().nullable(),
  linhVuc: z.string().nullable(),
  trinhTuThucHien: z.string().nullable(),
  doiTuongThucHien: z.string().nullable(),
  coQuanThucHien: z.string().nullable(),
  coQuanThamQuyen: z.string().nullable(),
  diaChiTiepNhan: z.string().nullable(),
  coQuanDuocUyQuyen: z.string().nullable(),
  coQuanPhoiHop: z.string().nullable(),
  ketQuaThucHien: z.string().nullable(),
  moTa: z.string().nullable()
})

export type thuTucType = z.infer<typeof thuTucSchema>

export const thuTucParams = z.object({
  thuTucId: z.string()
})
export type thuTucParamsType = z.infer<typeof thuTucParams>

export const thuTucItem = thuTucSchema.extend({
  cachThucThucHiens: z.array(cachThucThucHienSchema),
  thanhPhanHoSos: z.array(
    thanhPhanHoSoSchema.extend({
      giayTos: z.array(
        giayToSchema.extend({
          mauGiayTos: z.array(mauGiayToSchema)
        })
      )
    })
  )
})

// Get all thu tuc
export const getThuTucsQuery = Pagination.extend({
  search: z.string().optional()
})
export type getThuTucsQueryType = z.infer<typeof getThuTucsQuery>

export const getThuTucsRes = z.object({
  message: z.string(),
  data: PaginationDataRes.extend({
    search: z.string().optional(),
    thuTucs: z.array(thuTucItem)
  })
})
export type getThuTucsResType = z.infer<typeof getThuTucsRes>

// Get one thu tuc
export const getThuTucRes = z.object({
  message: z.string(),
  data: thuTucItem
})
export type getThuTucResType = z.infer<typeof getThuTucRes>
