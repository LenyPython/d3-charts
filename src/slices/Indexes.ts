import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import {BalanceResponse, HashedInstruments} from '../types'

// Define a type for the slice state
interface indexesInterface {
  indexes: HashedInstruments
  balance: BalanceResponse
}


// Define the initial state using that type
const initialState: indexesInterface = {
  indexes: {} as HashedInstruments,
  balance: {
balance: 0,
equity: 0,
equityFX: 0,
margin: 0,
marginFree: 0,
marginLevel: 0,
}
}

export const Indexes = createSlice({
  name: 'indexes',
  initialState,
  reducers: {
    setIndexes: (state, action: PayloadAction<HashedInstruments>) => {
      state.indexes = action.payload
    },
    setBalance: (state, action: PayloadAction<BalanceResponse>) =>{
      state.balance = action.payload
    }
  },
})

export const {setIndexes, setBalance} = Indexes.actions

// Other code such as selectors can use the imported `RootState` type
export const getIndexes = (state: RootState) => state.indexes.indexes
export const getBalance = (state: RootState) => state.indexes.balance

export default Indexes.reducer
