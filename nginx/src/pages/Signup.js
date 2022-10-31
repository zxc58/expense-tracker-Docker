import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../global/functions'
const SignupPage = (props) => {
  const navigate = useNavigate()
  return (
    <>
      <h1 className='text-center'>Sign up</h1>
        <div className='text-end'>
          <Link to="/signin" className="btn btn-success">Sign in</Link>
        </div>
      <form id='sign-up-form' onSubmit={signUp(navigate)}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" className="form-control" id="name" placeholder="Name" required />
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" name="email" className="form-control" id="email" placeholder="Email" required/>
            <small id="emailHelp" className="form-text text-muted">We&apos;ll never share your email with anyone else.</small>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className="form-control" id="password" placeholder="密碼 8~14 英數字" required />
          </div>
          <br/>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary">Sign up</button>
          </div>
        </fieldset>
      </form>
    </>
  )
}
export default SignupPage
