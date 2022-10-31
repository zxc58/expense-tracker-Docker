import React, { useContext } from 'react'
import { Context } from '../App'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '../global/functions'
const SigninPage = (props) => {
  const { setIsSignin } = useContext(Context)
  const navigate = useNavigate()
  return (
    <>
      <h1 className='text-center'>Sign in</h1>
      <div className='text-end'>
        <Link to="/signup" className="btn btn-success" >Sign up</Link>
      </div>
      <form autoComplete="off" id="signInForm" onSubmit={signIn(setIsSignin, navigate)}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" name="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" required/>
            <small id="emailHelp" className="form-text text-muted">We&apos;ll never share your email with anyone else.</small>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" name="password" className="form-control" pattern="^[a-zA-Z0-9]{8,14}$" placeholder="Enter password,8~14" required/>
          </div>
          <br/>
          <div className="form-group text-center">
            <button type='submit' className="btn btn-primary btn-lg ">Sign In</button>
          </div>
        </fieldset>
      </form>
    </>
  )
}

export default SigninPage
