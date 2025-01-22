import { ExpertApiService } from '@/services'
import { AxiosError } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { MessageError } from '../interfaces'
import { store } from '../store'
import { ExpertList, ExpertUI, GetAllExpertResponse, GetAllExpertVariables } from './interfaces'
import { setExpertList, setIndex, setSelectedExpert } from './store'

export class ExpertService {
  private static _instance: ExpertService
  private dispatch: typeof store.dispatch
  private state: typeof store.getState

  public static get instance(): ExpertService {
    if (!ExpertService._instance) {
      ExpertService._instance = new ExpertService()
    }
    return ExpertService._instance
  }

  constructor() {
    this.dispatch = store.dispatch
    this.state = store.getState
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

  public setSelectExpert(expert: ExpertUI, imageSrc: string, index: number) {
    const newData = cloneDeep(expert)
    newData.user.avatar = imageSrc
    this.dispatch(setSelectedExpert(newData))
    this.dispatch(setIndex(index))
  }

  public payBill() {
    const expert = this.state().expert
    console.log(expert)
    // SessionApiService.instance.CreateOneSession()
  }
}
