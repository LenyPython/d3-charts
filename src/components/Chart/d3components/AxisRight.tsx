import { format } from 'd3'

const AxisRight: React.FC<{
  MARGIN: { TOP: number; BOTTOM: number; LEFT: number; RIGHT: number }
  WIDTH: number
  HEIGHT: number
  yScale: any
  rescaleY: (e: React.WheelEvent) => void
}> = ({ MARGIN, WIDTH, HEIGHT, rescaleY, yScale }) => {
  const yScaleFormat = format('.5f')
  const xOffset = 5

  return (
    <g transform={`translate(${WIDTH - MARGIN.RIGHT}, ${MARGIN.TOP})`} onWheel={rescaleY}>
      <rect width={MARGIN.RIGHT} height={HEIGHT - MARGIN.BOTTOM - MARGIN.TOP} fill={'grey'} />
      <line y2={HEIGHT - MARGIN.BOTTOM - MARGIN.TOP} />
      {yScale.ticks(7).map((tickValue: number) => {
        return (
          <text
            className="yTick"
            key={`y-tick-${tickValue}`}
            dx={xOffset}
            dy={yScale(tickValue) - MARGIN.TOP}
          >
            {yScaleFormat(tickValue)}
          </text>
        )
      })}
    </g>
  )
}

export default AxisRight
