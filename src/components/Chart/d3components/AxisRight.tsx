import { priceFormat as yScaleFormat } from './utils'

const xOffset = 5
const AxisRight: React.FC<{
  yScale: any
  rescaleY?: (e: React.WheelEvent) => void
}> = ({ yScale, rescaleY }) => {
  if (rescaleY === undefined) rescaleY = () => {}
  return (
    <div className="panel-right container">
      <svg width="100%" height="100%" onWheel={rescaleY}>
        <line y1={0} y2={'100%'} strokeWidth={3} />
        {yScale.ticks(7).map((tickValue: number) => {
          return (
            <g key={`y-tick-${tickValue}`}>
              <text className="tick" dx={xOffset} dy={yScale(tickValue)}>
                {yScaleFormat(tickValue)}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default AxisRight
