import React, { useContext } from 'react'
import { Context } from '../App'
import Record from './Record'
const List = (props) => {
  const { records } = useContext(Context)
  const totalAmount = records.reduce((previousValue, currentValue) => {
    if (currentValue.display) { return previousValue + currentValue.amount }
    return previousValue
  }, 0)
  const RecordArray = records.reduce((total, e) => {
    if (e.display) { total.push(<Record key={e.id} record={e}/>) }
    return total
  }, [])
  return (
      <div>
        <span className='fs-5'>Total:</span><h1 className="text-center">{totalAmount}</h1>
        <ul className="list-group border border-primary" >
          { RecordArray }
        </ul>
      </div>
  )
}
export default List
