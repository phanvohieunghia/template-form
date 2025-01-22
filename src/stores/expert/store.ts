import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { ExpertList, ExpertUI } from './interfaces'

interface ExpertState {
  expertList: ExpertList
  files: File[]
  selectedExpert?: ExpertUI
  index?: number
}

const initialState: ExpertState = {
  expertList: { total: 0, rows: undefined },
  files: [],
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
    setIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload
    },
    setFiles: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload
    },
  },
})

export const { setExpertList, setSelectedExpert, setIndex, setFiles } = expertSlice.actions

export default expertSlice.reducer
