import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { ExpertList, ExpertUI } from './interfaces'

interface ExpertState {
  expertList: ExpertList
  selectedExpert?: ExpertUI
}

const initialState: ExpertState = {
  expertList: { total: 0, rows: undefined },
}

export const expertSlice = createSlice({
  name: 'expert',
  initialState,
  reducers: {
    setExpertList: (state, action: PayloadAction<ExpertState['expertList']>) => {
      state.expertList = action.payload
    },
    setSelectedExpert: (state, action: PayloadAction<ExpertState['selectedExpert']>) => {
      state.selectedExpert = action.payload
    },
  },
})

export const { setExpertList, setSelectedExpert } = expertSlice.actions

export default expertSlice.reducer
