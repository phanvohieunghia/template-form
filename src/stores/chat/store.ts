import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type Message = {
  userType: 'me' | 'bot'
  text: string | JSX.Element
  loading?: boolean
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
    editLastMessage: (state, action: PayloadAction<Message>) => {
      const newMessages = [...state.messages]
      newMessages[newMessages.length - 1].loading = false
      newMessages[newMessages.length - 1].text = action.payload.text
      state.messages = newMessages
    },
    clearMessages: (state) => {
      state.messages = []
    },
  },
})

export const { addMessage, editLastMessage, clearMessages } = chatSlice.actions

export default chatSlice.reducer
