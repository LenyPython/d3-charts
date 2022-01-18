import './GroupList.css'
import {useState} from "react"
import {instrumentInfo} from "../../types"
import {getChartData} from '../../sagas/actions'
import {useAppDispatch} from "../../app/hooks"

const GroupList: React.FC<{ 
  title: string,
  group: instrumentInfo[] 
}> = ({title, group}) => {
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const switchInsturment = (symbol: string) =>{
    dispatch(getChartData(symbol))
  }

  return (
    <div className="group-list">
      <h4 onClick={()=>setIsOpen(!isOpen)}>{title}</h4>
        <div className={isOpen?"open":"closed"}>
          {group?.map(instr=><p 
          key={instr.symbol}
          onClick={()=>switchInsturment(instr.symbol)}
          >
          {instr.symbol}
          </p>)}
        </div>
      </div>
  )
}


export default GroupList
