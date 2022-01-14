import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import {HashedInstruments} from '../types'

// Define a type for the slice state
interface indexesInterface {
  indexes: HashedInstruments
}

// Define the initial state using that type
const initialState: indexesInterface = {
  indexes: {} as HashedInstruments
}

export const Indexes = createSlice({
  name: 'indexes',
  initialState,
  reducers: {
    setIndexes: (state, action: PayloadAction<HashedInstruments>) => {
      state.indexes = action.payload
    }
  },
})

export const {setIndexes} = Indexes.actions

// Other code such as selectors can use the imported `RootState` type
export const getIndexes = (state: RootState) => state.indexes.indexes

export default Indexes.reducer
