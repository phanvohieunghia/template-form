import { ExpertApiService } from '@/services'
import { AxiosError } from 'axios'
import { MessageError } from '../interfaces'
import { store } from '../store'
import { ExpertList, ExpertUI, GetAllExpertResponse, GetAllExpertVariables } from './interfaces'
import { setExpertList, setSelectedExpert } from './store'

export class ExpertService {
  private static _instance: ExpertService
  private dispatch: typeof store.dispatch
  public static get instance(): ExpertService {
    if (!ExpertService._instance) {
      ExpertService._instance = new ExpertService()
    }
    return ExpertService._instance
  }

  constructor() {
    this.dispatch = store.dispatch
  }

  public async getAll(params?: GetAllExpertVariables): Promise<GetAllExpertResponse | void> {
    try {
      const newParams: GetAllExpertVariables = { limit: 20, page: 1, ...params }
      const { data } = await ExpertApiService.instance.getAll(newParams)
      const newData: ExpertList = {
        total: data.total,
        rows: data.mentors.map((item) => ({
          ...item,
        })),
      }
      this.dispatch(setExpertList(newData))
    } catch (e) {
      if (e instanceof AxiosError) {
        const data: MessageError = e.response?.data
        return { message: data.message, data: e.response?.data }
      }
      throw new Error(e as string)
    }
  }

  public setSelectExpert(expert: ExpertUI) {
    this.dispatch(setSelectedExpert(expert))
  }
}
