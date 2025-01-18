import { ProcedureApiService } from '@/services'
import { AxiosError } from 'axios'
import { store } from '../store'
import { GetListParamsVariables, ProcedureData, ProcedureError, ProcedureResponse } from './interfaces'
import { setData } from './store'

export class ProcedureService {
  private static _instance: ProcedureService
  private dispatch: typeof store.dispatch
  public static get instance(): ProcedureService {
    if (!ProcedureService._instance) {
      ProcedureService._instance = new ProcedureService()
    }
    return ProcedureService._instance
  }

  constructor() {
    this.dispatch = store.dispatch
  }

  public async getAll(params?: GetListParamsVariables): Promise<ProcedureResponse | void> {
    try {
      const newParams: GetListParamsVariables = { limit: 10, page: 1, ...params }
      const { data } = await ProcedureApiService.instance.getList(newParams)
      const newData: ProcedureData = {
        total: data.total,
        rows: data.thuTucs.map((item) => ({
          maThuTuc: item.maThuTuc,
          tenThuTuc: item.tenThuTuc,
          loaiThuTuc: item.loaiThuTuc,
          linhVuc: item.linhVuc,
          thuTucId: item.thuTucId,
        })),
      }
      this.dispatch(setData(newData))
    } catch (e) {
      if (e instanceof AxiosError) {
        const data: ProcedureError = e.response?.data
        return { message: data.message }
      }
      throw new Error(e as string)
    }
  }
}
