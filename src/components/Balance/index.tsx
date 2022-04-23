import { useAppSelector } from '../../app/hooks'
import { getBalance } from '../../store/Balance/selectors'
import { UserBalanceData } from '../../store/Balance/types'
import './balance.css'

const Balance = () => {
  const balance = useAppSelector(getBalance) as UserBalanceData

  return (
    <div id="container-balance">
      Balance: <span>{balance.balance} </span> Equity: <span>{balance.equity} </span>
      Margin: <span>{balance.margin}% </span>
      MarginFree: <span>{balance.marginFree}% </span>
      MarginLevel: <span>{balance.marginLevel}%</span>
    </div>
  )
}

export default Balance
