import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type Message = {
  userType: 'me' | 'bot'
  text: string
}

type ChatState = {
  messages: Message[]
}
const initialState: ChatState = { messages: [] }

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      const newMessages = [...state.messages]
      newMessages.push(action.payload)
      state.messages = newMessages
    },
  },
})

export const { addMessage } = chatSlice.actions

export default chatSlice.reducer
