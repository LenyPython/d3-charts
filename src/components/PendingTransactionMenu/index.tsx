import { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { getCurrentChartSymbol } from '../../store/OpenedInstruments/selectors'
import { getInstrumentCurrentPrice } from '../../store/OpenedInstrumentsStream/selectors'
import PendingOrderButtons from '../PendingOrderButtons'
import './PendingTransactionMenu.css'

const PendingTransactionMenu = () => {
  const symbol = useAppSelector(getCurrentChartSymbol)
  const transaction = useTransactionInfo()
  const currentPrice = useAppSelector(getInstrumentCurrentPrice)[symbol]['level0'].bid
  const { sl, setSl, tp, setTp, vol, setVol, price, setPrice } = transaction
  useEffect(() => {
    setPrice(currentPrice)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    if (target.name === 'tp') setTp(+target.value)
    else if (target.name === 'sl') setSl(+target.value)
    else if (target.name === 'vol') setVol(+target.value)
    else setPrice(+target.value)
  }
  return (
    <div id="pending-transaction-container" className="dfc aic">
      <h5>Market order:</h5>
      <label htmlFor="vol">Volume:</label>
      <input type="number" name="vol" min={0} step={0.01} value={vol} onChange={handleChange} />
      <label htmlFor="price">Price:</label>
      <input
        type="number"
        name="price"
        min={0}
        step={0.001}
        value={price}
        onChange={handleChange}
      />
      <label htmlFor="tp">TP:</label>
      <input type="number" name="tp" min={0} step={0.001} value={tp} onChange={handleChange} />
      <label htmlFor="sl">SL:</label>
      <input type="number" name="sl" min={0} step={0.001} value={sl} onChange={handleChange} />
      <PendingOrderButtons transaction={transaction} />
    </div>
  )
}

export default PendingTransactionMenu

const useTransactionInfo = () => {
  const [sl, setSl] = useState<number>(0)
  const [tp, setTp] = useState<number>(0)
  const [vol, setVol] = useState<number>(0.01)
  const [price, setPrice] = useState<number>(0)
  return {
    sl,
    setSl,
    tp,
    setTp,
    vol,
    setVol,
    price,
    setPrice,
  }
}
export type TransactionInfoHook = ReturnType<typeof useTransactionInfo>
