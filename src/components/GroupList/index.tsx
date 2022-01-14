import {useState} from "react"
import {instrumentInfo} from "../../types"

const GroupList: React.FC<{ 
  title: string,
  group: instrumentInfo[] 
}> = ({title, group}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="group-list" onClick={()=>setIsOpen(!isOpen)}>
        {title}
        <div className={isOpen?"open":"closed"}>
          {group?.map(instr=><p key={instr.symbol}>{instr.symbol}</p>)}
        </div>
      </div>
  )
}


export default GroupList
