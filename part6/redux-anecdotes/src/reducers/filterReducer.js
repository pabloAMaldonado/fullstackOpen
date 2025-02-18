
import { createSlice } from '@reduxjs/toolkit'

const  filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterHandler(state, action) {
      return action.payload
    }
  }
})


export const { filterHandler } = filterSlice.actions

export default filterSlice.reducer
