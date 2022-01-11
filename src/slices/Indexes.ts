import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

// Define a type for the slice state
interface indexesInterface {
  indexes: string[]
}

// Define the initial state using that type
const initialState: indexesInterface = {
  indexes: [] as string[]
}

export const Indexes = createSlice({
  name: 'indexes',
  initialState,
  reducers: {
    setIndexes: (state, action: PayloadAction<string[]>) => {
      state.indexes = action.payload
    }
  },
})

export const {setIndexes} = Indexes.actions

// Other code such as selectors can use the imported `RootState` type
export const getIndexes = (state: RootState) => state.indexes.indexes

export default Indexes.reducer
