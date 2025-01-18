import { configureStore } from '@reduxjs/toolkit'
import procedure from './procedure/store'

export const store = configureStore({
  reducer: {
    procedure: procedure,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
