import {useAppSelector} from "../../app/hooks"
import {getTrades} from '../../slices/BalanceSlice'
import {TradeInterface} from "../../types/BalanceTradesTypes"

const Transactions = () => {
  const trades = useAppSelector(getTrades)
  return (
      <div id="transactions">
            <table>
          <tr>
            <td>Symbol</td>
            <td>sl</td>
            <td>tp</td>
          </tr>
          {trades.map((trade: TradeInterface) => {
            return <tr key={trade.symbol}>
                    <td>{trade.symbol}</td>
                    <td>{trade.sl}</td>
                    <td>{trade.tp}</td>
                  </tr>
      })}
        </table>
      </div>
  )
}

export default Transactions
