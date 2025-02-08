import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  forgotPasswordToken: string
}
const initialState: AuthState = {
  forgotPasswordToken: '',
}

export const procedureSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setForgotPasswordToken: (state, action: PayloadAction<AuthState['forgotPasswordToken']>) => {
      state.forgotPasswordToken = action.payload
    },
  },
})

export const { setForgotPasswordToken } = procedureSlice.actions

export default procedureSlice.reducer
