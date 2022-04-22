import { TradePricesInterface } from './../../store/OpenedInstrumentsStream/types'
import { IndexInterface } from '../../store/MainConnection/types'
import { HashedInstruments } from '../../store/OpenedInstruments/types'

export const hashInstruments = (data: IndexInterface[]) => {
  let instruments = {} as HashedInstruments
  let prices = {} as Record<string, TradePricesInterface>
  for (let instrument of data) {
    const { categoryName, groupName, swapLong, swapShort, symbol, ask, bid } = instrument
    prices[symbol] = { ask, bid }
    const entry = {
      symbol,
      swapShort,
      swapLong,
    }
    if (instruments[categoryName] === undefined) instruments[categoryName] = {}
    instruments[categoryName][groupName] === undefined
      ? (instruments[categoryName][groupName] = [entry])
      : instruments[categoryName][groupName].push(entry)
  }
  return {
    prices,
    hashedIndexes: instruments,
  }
}
