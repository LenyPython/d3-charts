import { PriceData } from './../../../types/index'
import { format, min, max, scaleLinear, scaleBand } from 'd3'

export const priceFormat = format('.5f')

const heightFromContainerSingleChart = 40
const topSpacing = 25
const createScales = (data: PriceData[], size?: { width: number; height: number }) => {
  const width = size?.width ?? 500
  const height = size?.height ?? 300

  const xScale = scaleBand()
    .domain(data.map((d: PriceData) => d.ctmString))
    .range([0, width])
    .paddingOuter(5)
  const yScale = scaleLinear()
    .domain([min(data, (d: PriceData) => d.low)!, max(data, (d: PriceData) => d.low)!])
    .range([height - heightFromContainerSingleChart, topSpacing])
  const yVolumeScale = scaleLinear()
    .domain([min(data, (d: PriceData) => d.vol)!, max(data, (d: PriceData) => d.vol)!])
    .range([height, height - heightFromContainerSingleChart])
  return {
    xScale,
    yScale,
    yVolumeScale,
  }
}

export default createScales
