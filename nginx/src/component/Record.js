import React, { useContext } from 'react'
import { Context } from '../App'
import { Link } from 'react-router-dom'
import { deleteRecord } from '../global/functions'
const Record = (props) => {
  const { setRecords, categories } = useContext(Context)
  const { record } = props
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center border border-primary">
            <figure className=" mb-0">
        <blockquote className="blockquote ">
          <p className="mb-0">{record.name}</p>
        </blockquote>
        <figcaption className="blockquote-footer mb-0">
          <i className={categories.find(e => record.categoryId === e.id).iconClass}></i>
          {(new Date(record.date)).toLocaleDateString()}
        </figcaption>
      </figure>
      <h4 className="ms-auto text-end">{record.amount}</h4>
      <div className="ms-auto">
        <Link to={`/records/${record.id}/edit`} className='btn btn-warning'>Edit</Link>
        {/* Button trigger modal */}
        <button type="button" className="ms-1 btn btn-danger" data-bs-toggle="modal" data-bs-target={'#Modal' + record.id}>Delete</button>
        {/* <!-- Modal --> */}
        <div className="modal fade" id={'Modal' + record.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">確定刪除?</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-footer">
                <form>
                  {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                  <button type="button" id={record.id + 'btn'} className="btn btn-danger ms-1" onClick={deleteRecord(record.id, setRecords)} data-bs-dismiss="modal">Delete</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default Record
