import { PriceData, RawPriceData } from '../../types'
import { PriceDataResponse } from '../MainConnection/types'
import { ChartPriceDataWithObjects, PERIODS, SmallChartsData } from './types'

export const analyzeChart = (data: RawPriceData[]) => {
  let windowSMA = 0
  const analyzed = data.map((item: RawPriceData, i: number) => {
    let analyzedItem: PriceData = {
      ...item,
      indicators: {
        HIGH: false,
        LOW: false,
        SMA: 0,
      },
    }
    if (i > 2 && i < data.length - 3) {
      if (isLow(i, item, data)) {
        analyzedItem.indicators.LOW = true
      }
      if (isHigh(i, item, data)) {
        analyzedItem.indicators.HIGH = true
      }
    }
    windowSMA += item.close
    if (i >= 7) {
      windowSMA -= data[i - 7].close
      const SMA = windowSMA / 7
      analyzedItem.indicators.SMA = SMA
    }
    return analyzedItem
  })
  return analyzed
}

const isLow = (i: number, item: RawPriceData, arr: RawPriceData[]) => {
  return (
    arr[i - 1].low > item.low &&
    arr[i - 2].low > item.low &&
    arr[i + 1].low > item.low &&
    arr[i + 2].low > item.low
  )
}
const isHigh = (i: number, item: RawPriceData, arr: RawPriceData[]) => {
  return (
    arr[i - 1].high < item.high &&
    arr[i - 2].high < item.high &&
    arr[i + 1].high < item.high &&
    arr[i + 2].high < item.high
  )
}
export const parseChartData = (returnData: PriceDataResponse): RawPriceData[] => {
  const { digits, rateInfos } = returnData
  const correct = Math.pow(10, digits)
  const data = rateInfos.map((item: RawPriceData) => ({
    close: (item.open + item.close) / correct,
    open: item.open / correct,
    high: (item.open + item.high) / correct,
    low: (item.open + item.low) / correct,
    ctm: new Date(item.ctm),
    ctmString: item.ctmString,
    vol: item.vol,
  }))
  return data
}

export const createChartDataObject = (
  period: PERIODS,
  periodData: PriceData[],
): ChartPriceDataWithObjects => {
  let data: SmallChartsData = {
    MIN_1: [],
    MIN_5: [],
    MIN_15: [],
    MIN_30: [],
    HOUR_1: [],
    HOUR_4: [],
    DAY: [],
    WEEK: [],
    MONTH: [],
  }
  data[period] = periodData
  return {
    data,
    consolidation: [] as string[][],
  }
}
