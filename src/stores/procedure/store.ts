import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ProcedureData } from './interfaces'

interface ProcedureState {
  data: ProcedureData
}

const initialState: ProcedureState = {
  data: { total: 0, rows: undefined },
}

export const procedureSlice = createSlice({
  name: 'procedure',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<ProcedureData>) => {
      state.data = action.payload
    },
  },
})

export const { setData } = procedureSlice.actions

export const selectCount = (state: RootState) => state.procedure

export default procedureSlice.reducer
