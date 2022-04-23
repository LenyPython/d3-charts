import { format, ScaleLinear, ScaleTime } from 'd3'

const Axis: React.FC<{
  MARGIN: { TOP: number; BOTTOM: number; LEFT: number; RIGHT: number }
  WIDTH: number
  HEIGHT: number
  xScale: ScaleTime<Range, any, never>
  yScale: ScaleLinear<number, number, never>
}> = ({ MARGIN, WIDTH, HEIGHT, xScale, yScale }) => {
  const xScaleFormat = format('.5f')
  const yOffset = 20
  const xOffset = 5
  return (
    <>
      <line
        x1={WIDTH - MARGIN.RIGHT}
        x2={WIDTH - MARGIN.RIGHT}
        y1={MARGIN.TOP}
        y2={HEIGHT - MARGIN.BOTTOM}
      />
      {xScale.ticks().map((tickValue: Date) => {
        return (
          <text
            className="xTick"
            key={tickValue.toDateString()}
            x={xScale(tickValue)}
            y={HEIGHT - MARGIN.BOTTOM + yOffset}
          >
            {tickValue.toLocaleDateString()}
          </text>
        )
      })}
      <line
        x1={MARGIN.LEFT}
        x2={WIDTH - MARGIN.RIGHT}
        y1={HEIGHT - MARGIN.BOTTOM}
        y2={HEIGHT - MARGIN.BOTTOM}
      />
      {yScale.ticks().map((tickValue: number) => {
        return (
          <text
            className="yTick"
            key={`y-tick ${tickValue}`}
            x={WIDTH - MARGIN.RIGHT + xOffset}
            y={yScale(tickValue)}
          >
            {xScaleFormat(tickValue)}
          </text>
        )
      })}
    </>
  )
}

export default Axis
