import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import List from '../component/List'
import { Context } from '../App'
import { filterByCategory } from '../global/functions'
const Main = (props) => {
  const { categories, setRecords } = useContext(Context)
  return (
    <>
      <div className="form-group d-flex">
        <form id="filterForm">
          <fieldset>
            <select id="filterSelect" onChange={filterByCategory(setRecords)}>
              <option value="all">全部</option>
              {categories.map(e => <option key={'category' + e.id} value={e.id}>{e.name}</option>)}
            </select>
          </fieldset>
        </form>
        <Link to='/records/new' className='btn btn-success ms-auto'>Create a new record</Link>
      </div>
      <div className='text-end'>
      </div>
      <List/>
    </>
  )
}
export default Main
