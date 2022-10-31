import axios from 'axios'
const createInstance = () => axios.create({
  baseURL: process.env.REACT_APP_BACK_END_HOST,
  headers: {
    Authorization: 'Bearer ' + window.localStorage.getItem('jwtToken')
  },
  timeout: 2000
})

export default createInstance
