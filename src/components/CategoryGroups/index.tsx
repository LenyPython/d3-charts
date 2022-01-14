import {useAppSelector} from "../../app/hooks"
import {getIndexes} from "../../slices/Indexes"
import GroupList from "../GroupList"

const CategoryGroup: React.FC<{ category: string }> = ({category}) => {
  const indexes = useAppSelector(getIndexes)
  const group = indexes?.[category]
  const groups = group ? Object.keys(group) : []


  return (
      <div className="category-group">
        {groups&&groups.map(instr=>{
        return <GroupList key={instr} title={instr} group={group[instr]} />
        })}
      </div>
  )
}


export default CategoryGroup
