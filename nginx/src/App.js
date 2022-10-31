import React, { useState, useEffect } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import SigninPage from './pages/Signin'
import SignupPage from './pages/Signup'
import Main from './pages/Main'
import createInstance from './global/api'
import Nav from './component/Nav'
import RecordForm from './pages/RecordForm'
import { AuthController, AntiAuthController } from './controller/RouteController'
export const Context = React.createContext()
const App = (props) => {
  const [isSignin, setIsSignin] = useState(!!window.localStorage.getItem('jwtToken'))
  const [user, setUser] = useState({})
  const [categories, setCategories] = useState([])
  const [records, setRecords] = useState([])
  useEffect(() => {
    if (isSignin) {
      (async function getUser () {
        const instance = createInstance()
        const [userRes, categoriesRes, recordRes] = await Promise.all([
          instance.get('/users'), instance.get('/categories'), instance.get('/records')
        ])
        const records = recordRes.data.records.map(e => ({ ...e, display: true }))
        setUser(userRes.data.user)
        setCategories(categoriesRes.data.categories)
        setRecords(records)
      })()
    } else {
      setUser({})
      setCategories([])
      setRecords([])
    }
  }, [isSignin])
  return (
    <>
      <Context.Provider value={ { user, categories, records, setCategories, setRecords, setUser, setIsSignin, isSignin } }>
        <HashRouter>
          <Nav/>
          <main className="container mt-5" style={{ maxWidth: '700px' }}>
            <Routes>
              <Route element={<AntiAuthController/>}>
                <Route path="/signup" element={ <SignupPage/> } />
                <Route path="/signin" element={ <SigninPage/> } />
                <Route path="*" element={<Navigate to="/signin" replace />} />
              </Route>
              <Route element={<AuthController/>}>
                <Route path='/records/:id/edit' element={<RecordForm/>}/>
                <Route path='/records/new' element={ <RecordForm/> }/>
                <Route path='/records' element={<Main user={ user }/>} />
                <Route path="*" element={<Navigate to="/records" replace />} />
              </Route>
            </Routes>
          </main>
        </HashRouter>
      </Context.Provider>
    </>
  )
}

export default App
