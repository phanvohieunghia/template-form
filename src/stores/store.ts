import { configureStore } from '@reduxjs/toolkit'
import auth from './auth/store'
import chat from './chat/store'
import expert from './expert/store'
import payment from './payment/store'
import procedure from './procedure/store'

export const store = configureStore({
  reducer: {
    procedure,
    expert,
    payment,
    auth,
    chat,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
