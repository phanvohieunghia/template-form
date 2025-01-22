import { ExpertApiService, MessageApiService, UploadedFileApiService } from '@/services'
import { SessionApiService } from '@/services/apis/session'
import { AxiosError } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { MessageError } from '../interfaces'
import { store } from '../store'
import { ExpertList, ExpertUI, GetAllExpertResponse, GetAllExpertVariables, PayBillResponse } from './interfaces'
import { setExpertList, setFiles, setIndex, setSelectedExpert } from './store'

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

  public setFiles(files: File[]) {
    console.log(files)
    this.dispatch(setFiles(files))
  }

  public async payBill(): Promise<PayBillResponse> {
    const expert = this.state().expert
    console.log(expert)
    try {
      const { procedureDetail } = this.state().procedure
      const { selectedExpert, files } = this.state().expert

      const sessionResponse = await SessionApiService.instance.CreateOneSession({
        mentorId: selectedExpert?.mentorId ?? '',
        thuTucId: procedureDetail?.thuTucId ?? '',
      })

      const { data } = await UploadedFileApiService.instance.uploadOneFile({ file: files[0] })

      const response3 = await MessageApiService.instance.createOneMessage({
        fileUrl: data.url,
        sessionId: sessionResponse.data.sessionId,
        content: null,
      })

      return { momoUrl: response3.data.payment?.payUrl ?? '' }
    } catch (e) {
      if (e instanceof AxiosError) {
        const data: MessageError = e.response?.data
        return { message: data.message, data: e.response?.data }
      }
      throw new Error(e as string)
    }
    // SessionApiService.instance.CreateOneSession()
  }
}
