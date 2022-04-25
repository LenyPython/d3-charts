import { format } from 'd3'

const Axis: React.FC<{
  MARGIN: { TOP: number; BOTTOM: number; LEFT: number; RIGHT: number }
  WIDTH: number
  HEIGHT: number
  xScale: any
  yScale: any
  limit?: boolean
}> = ({ MARGIN, WIDTH, HEIGHT, xScale, yScale, limit }) => {
  const xScaleFormat = format('.5f')
  const yOffset = 20
  const xOffset = 2
  return (
    <>
      <line
        x1={WIDTH - MARGIN.RIGHT}
        x2={WIDTH - MARGIN.RIGHT}
        y1={MARGIN.TOP}
        y2={HEIGHT - MARGIN.BOTTOM}
      />
      {!limit &&
        xScale
          .domain()
          .filter((d: string, i: number) => i % 25 === 0)
          .map((tick: string, i: number) => {
            return (
              <text
                className="xTick"
                key={`${i}-${tick}`}
                transform={`translate(${xScale(tick)},${HEIGHT - MARGIN.BOTTOM + yOffset}) 
                rotate(90)`}
              >
                {tick}
              </text>
            )
          })}

      <line
        x1={MARGIN.LEFT}
        x2={WIDTH - MARGIN.RIGHT}
        y1={HEIGHT - MARGIN.BOTTOM}
        y2={HEIGHT - MARGIN.BOTTOM}
      />
      {!limit &&
        yScale.ticks(7).map((tickValue: number) => {
          return (
            <text
              className="yTick"
              key={`y-tick-${tickValue}`}
              dx={WIDTH - MARGIN.RIGHT + xOffset}
              dy={yScale(tickValue)}
            >
              {xScaleFormat(tickValue)}
            </text>
          )
        })}
    </>
  )
}

export default Axis