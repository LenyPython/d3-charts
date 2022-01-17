import {useAppSelector} from "../../app/hooks"
import {getBalance} from "../../slices/Indexes"
import {BalanceResponse} from "../../types"

const Balance: React.FC<{
  onClick: React.MouseEventHandler<HTMLElement>
}> = ({onClick}) => {
  const balance = useAppSelector(getBalance) as BalanceResponse
  
  return (
    <div id='balance' onClick={onClick}>
      {`Balance: ${balance.balance} equity: ${balance.equity} Margin: ${balance.margin} MarginFree: ${balance.marginFree} MarginLevel: ${balance.marginLevel}`}
    </div>
  )
}

export default Balance
