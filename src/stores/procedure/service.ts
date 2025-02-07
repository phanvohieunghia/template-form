import { ProcedureApiService } from '@/services'
import { AxiosError } from 'axios'
import { MessageError } from '../interfaces'
import { store } from '../store'
import { GetAllProcedureVariables, GetOneVariables, ProcedureList, ProcedureResponse } from './interfaces'
import { setProcedure, setProcedureDetail, setSearch } from './store'

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

  public async getAll(params?: GetAllProcedureVariables): Promise<ProcedureResponse | void> {
    try {
      const newParams: GetAllProcedureVariables = { limit: 10, page: 1, ...params }
      const {data}  = await ProcedureApiService.instance.getAll(newParams)
      const newData: ProcedureList = {
        total: data.total,
        rows: data.thuTucs.map((item) => ({
          maThuTuc: item.maThuTuc,
          tenThuTuc: item.tenThuTuc,
          loaiThuTuc: item.loaiThuTuc,
          linhVuc: item.linhVuc,
          thuTucId: item.thuTucId,
        })),
      }
      this.dispatch(setProcedure(newData))
    } catch (e) {
      if (e instanceof AxiosError) {
        const data: MessageError = e.response?.data
        return { message: data.message }
      }
      throw new Error(e as string)
    }
  }

  public async getOne(params: GetOneVariables): Promise<ProcedureResponse | void> {
    try {
      const { data } = await ProcedureApiService.instance.getOne(params)
      this.dispatch(setProcedureDetail(data))
    } catch (e) {
      if (e instanceof AxiosError) {
        const data: MessageError = e.response?.data
        return { message: data.message }
      }
      throw new Error(e as string)
    }
  }

  public updateSearch(param: string): void {
    this.dispatch(setSearch(param))
  }
}
