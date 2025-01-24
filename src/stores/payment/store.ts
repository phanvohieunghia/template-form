import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { MomoRedirectUrlVariables } from './interfaces'

interface PaymentState {
  information?: MomoRedirectUrlVariables
}
const initialState: PaymentState = {}

export const procedureSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setInformation: (state, action: PayloadAction<PaymentState['information']>) => {
      state.information = action.payload
    },
  },
})

export const { setInformation } = procedureSlice.actions

export default procedureSlice.reducer
