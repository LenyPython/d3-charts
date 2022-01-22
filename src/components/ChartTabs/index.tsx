import {SetStateAction, Dispatch} from "react"
import {useAppSelector} from "../../app/hooks"
import {getOpenedCharts} from "../../slices/Indexes"


const ChartTabs: React.FC<{
  setSymbol: Dispatch<SetStateAction<string>>
}> = ({setSymbol}) => {

  const OpenedChartTabsKeys = Array.from(useAppSelector(getOpenedCharts))
  console.log(OpenedChartTabsKeys)

  return (
    <div id="chart-tabs">
      {
        OpenedChartTabsKeys.map(symbol=><p
                               key={symbol}
          onClick={()=>setSymbol(symbol)}
        >{symbol}</p>)
      }
    </div>
  )

}

export default ChartTabs
