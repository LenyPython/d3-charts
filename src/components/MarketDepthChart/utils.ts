import { PriceLevelsInterface } from '../../store/OpenedInstrumentsStream/types'
import { scaleLinear } from 'd3'

const margin = 10
const createYScale = (data: PriceLevelsInterface, height?: number) => {
  if (!height) height = 50

  const yScale = scaleLinear()
    .domain([data[0].low, data[0].high])
    .range([height - margin, margin])
  return yScale
}

export default createYScale
