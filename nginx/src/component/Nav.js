import React, { useContext } from 'react'
import { Context } from '../App'
import { useNavigate, Link } from 'react-router-dom'
const Nav = (props) => {
  const navigate = useNavigate()
  const { user, setIsSignin } = useContext(Context)
  const signOut = () => {
    window.localStorage.removeItem('jwtToken')
    setIsSignin(false)
    navigate('/')
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container-fluid">
      <Link className="navbar-brand fw-bold fs-5" to='/'>Home</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse pd-1" id="navbarColor01">
        <ul className="navbar-nav "></ul>
        {Object.keys(user).length !== 0
          ? <ul className="navbar-nav ms-auto">
          <li className="nav-item dropdown ">
            <a className="nav-link dropdown-toggle fs-5 text-white" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{user.name}</a>
            <div className="dropdown-menu" style={{ left: '-90px' }}>
              <a className="dropdown-item" onClick={signOut} style={{ cursor: 'pointer' }}>sign out</a>
            </div>
          </li>
        </ul>
          : null}
      </div>
    </div>
  </nav>
  )
}
export default Nav
