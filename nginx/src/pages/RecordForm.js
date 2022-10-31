import * as dayjs from 'dayjs'
import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Context } from '../App'
import { submitRecord } from '../global/functions'
const RecordForm = (props) => {
  const { categories, records, setRecords } = useContext(Context)
  const navigate = useNavigate()
  const id = useParams().id || null
  const record = id ? records.find(e => Number(e.id) === Number(id)) : {}
  return (
    <>
      <h1 className='text-center'>{id ? 'Edit Record' : 'New Record'}</h1>
      <form id='record-form' onSubmit={submitRecord(id, setRecords, navigate)}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Name : (max length 20)</label>
            <input type="text" name="name" className="form-control" id="name" defaultValue={record?.name} maxLength={20} required/>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input type="date" name="date" className="form-control" id="date" defaultValue={record?.date ? dayjs(record.date).format('YYYY-MM-DD') : ''} required/>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="amount">Amount : (max 999999)</label>
            <input type="number" name="amount" className="form-control" id="amount" defaultValue={record?.amount} required max={999999}/>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select className="form-select" id="category" name="categoryId" defaultValue={record?.categoryId} >
              {categories.map(e => <option key={'category' + e.id} value={e.id}>{e.name}</option>)}
            </select>
          </div>
          <br/>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-lg btn-primary">Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  )
}
export default RecordForm
