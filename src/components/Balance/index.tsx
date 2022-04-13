import { useAppSelector } from '../../app/hooks'
import { getBalance } from '../../store/Balance/selectors'
import { UserBalance } from '../../store/Balance/types'
import './balance.css'

const Balance: React.FC<{
  onClick: React.MouseEventHandler<HTMLElement>
}> = ({ onClick }) => {
  const balance = useAppSelector(getBalance) as UserBalance

  return (
    <div id="balance" onClick={onClick}>
      <p>
        Balance: <span>{balance.balance} </span> Equity: <span>{balance.equity} </span>
        Margin: <span>{balance.margin}% </span>
        MarginFree: <span>{balance.marginFree}% </span>
        MarginLevel: <span>{balance.marginLevel}%</span>
      </p>
    </div>
  )
}

export default Balance
