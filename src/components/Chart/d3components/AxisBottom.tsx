const AxisBottom: React.FC<{
  MARGIN: { TOP: number; BOTTOM: number; LEFT: number; RIGHT: number }
  WIDTH: number
  HEIGHT: number
}> = ({ MARGIN, WIDTH, HEIGHT }) => {
  return (
    <g>
      <line
        x1={MARGIN.LEFT}
        x2={WIDTH - MARGIN.RIGHT}
        y1={HEIGHT - MARGIN.BOTTOM}
        y2={HEIGHT - MARGIN.BOTTOM}
      />
    </g>
  )
}

export default AxisBottom
