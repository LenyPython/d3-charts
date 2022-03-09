import { IndexInterface } from '../../store/MainConnection/types'
import { HashedInstruments } from '../../store/OpenedInstruments/types'

export const hashInstruments = (data: IndexInterface[]) => {
  let instruments = {} as HashedInstruments
  for (let instrument of data) {
    const { categoryName, groupName, swapLong, swapShort, symbol } = instrument
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
  return instruments
}
