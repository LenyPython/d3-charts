import { PriceData } from '../types'

const startDate = new Date()
const second = 1000
export const minute = second * 60
export const min15 = minute * 15
export const hour = min15 * 4
export const hour4 = hour * 4
export const day = hour4 * 6

export const createData = (num = 70): PriceData[] => {
  let data = [] as PriceData[]
  let lastClose = 1
  for (let i = 1; i <= num; i++) {
    const date = new Date(startDate.getTime() + i * min15)
    let upOrDown = Math.random() < 0.5 ? 1 : -1
    let close = lastClose + upOrDown * Math.random() * 0.2
    let rand = Math.random() * 0.02
    data.push({
      ctmString: date.toDateString(),
      open: lastClose,
      close: close,
      high: upOrDown > 0 ? close + rand : lastClose + rand,
      low: upOrDown > 0 ? lastClose - rand : close - rand,
      vol: 10,
      ctm: date,
    })
    lastClose = data[data.length - 1].close
  }
  return data
}
