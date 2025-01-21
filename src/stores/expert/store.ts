import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { ExpertList } from './interfaces'

interface ExpertState {
  expertList: ExpertList
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
  },
})

export const { setExpertList } = expertSlice.actions

export default expertSlice.reducer
