import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Example } from '../example/interfaces'

interface ExampleState {
  exampleProperty?: Example
}
const initialState: ExampleState = {}

export const procedureSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setExample: (state, action: PayloadAction<ExampleState['exampleProperty']>) => {
      state.exampleProperty = action.payload
    },
  },
})

export const { setExample } = procedureSlice.actions

export default procedureSlice.reducer
