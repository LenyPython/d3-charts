import {useRef} from "react"
import {PriceData} from '../../types'

const Chart: React.FC<{
  data?: PriceData[]
}> = ({data}) => {
  if(data) console.log(data)
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  return (
    <canvas ref={chartRef} />
  )

}

export default Chart
