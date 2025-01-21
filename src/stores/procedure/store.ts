import { getSearchParams } from '@/utils'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { ProcedureDetailUI, ProcedureList } from './interfaces'

interface ProcedureState {
  procedureList: ProcedureList
  search: string
  procedureDetail?: ProcedureDetailUI
}
const url = getSearchParams()
const initialState: ProcedureState = {
  procedureList: { total: 0, rows: undefined },
  search: url.search ?? '',
}

export const procedureSlice = createSlice({
  name: 'procedure',
  initialState,
  reducers: {
    setProcedure: (state, action: PayloadAction<ProcedureState['procedureList']>) => {
      state.procedureList = action.payload
    },
    setSearch: (state, action: PayloadAction<ProcedureState['search']>) => {
      state.search = action.payload
    },
    setProcedureDetail: (state, action: PayloadAction<ProcedureState['procedureDetail']>) => {
      state.procedureDetail = action.payload
    },
  },
})

export const { setProcedure, setSearch, setProcedureDetail } = procedureSlice.actions

export default procedureSlice.reducer
