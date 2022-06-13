import { PriceData } from '../../../types'

const AxisBottom: React.FC<{
  data?: PriceData[]
  size?: { width: number; height: number }
}> = ({ size }) => {
  return (
    <div className="container-bottom-center container">
      <svg viewBox={`0 0 ${size?.width ?? 0} 40`}>
        <line x1={0} x2="100%" y1={1} y2={1} />
        <g></g>
      </svg>
    </div>
  )
}

export default AxisBottom
