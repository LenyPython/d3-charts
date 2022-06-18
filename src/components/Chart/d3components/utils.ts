import { PriceData } from './../../../types/index'
import { min, max, scaleLinear, scaleBand } from 'd3'

const createScales = (data: PriceData[], size?: { width: number; height: number }) => {
  const width = size?.width ?? 500
  const height = size?.height ?? 300

  const xScale = scaleBand()
    .domain(data.map((d: PriceData) => d.ctmString))
    .range([0, width])
    .paddingOuter(5)
  const yScale = scaleLinear()
    .domain([min(data, (d: PriceData) => d.low)!, max(data, (d: PriceData) => d.low)!])
    .range([height, 0])
  return {
    xScale,
    yScale,
  }
}

export default createScales
