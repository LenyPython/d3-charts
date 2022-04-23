const Title: React.FC<{
  svgWidth: number
  title: string
}> = ({ svgWidth, title }) => {
  return (
    <g transform={`translate(${svgWidth / 2}, 25)`}>
      <text>{title}</text>
    </g>
  )
}
export default Title
