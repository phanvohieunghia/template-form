import { configureStore } from '@reduxjs/toolkit'
import expert from './expert/store'
import procedure from './procedure/store'

export const store = configureStore({
  reducer: {
    procedure: procedure,
    expert: expert,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
