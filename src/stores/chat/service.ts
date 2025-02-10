import { ChatApiService } from '@/services'
import { AxiosError } from 'axios'
import { MessageError } from '../interfaces'
import { store } from '../store'
import { ChatOneVariables, ChatResponse } from './interfaces'
import { addMessage } from './store'

export class ChatService {
  private static _instance: ChatService
  private dispatch: typeof store.dispatch
  private state: typeof store.getState

  public static get instance(): ChatService {
    if (!ChatService._instance) {
      ChatService._instance = new ChatService()
    }
    return ChatService._instance
  }

  constructor() {
    this.dispatch = store.dispatch
    this.state = store.getState
  }

  public async chatOne(data: ChatOneVariables): Promise<void | ChatResponse> {
    try {
      this.dispatch(addMessage({ userType: 'me', text: data.chatInput }))
      const { output } = await ChatApiService.instance.chatOne(data)
      this.dispatch(addMessage({ userType: 'bot', text: output }))
    } catch (e) {
      if (e instanceof AxiosError) {
        const data: MessageError = e.response?.data
        return { success: false, message: data.message }
      }
      throw new Error(e as string)
    }
  }

  public async getAllMessages() {
    return this.state().chat.messages
  }
}
