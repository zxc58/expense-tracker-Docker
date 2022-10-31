import createInstance from './api'
import axios from 'axios'
//
export const deleteRecord = (id, setRecords) => async () => {
  const instance = createInstance()
  const response = await instance.delete(`/records/${id}`)
  setRecords(prevRecords => {
    const index = prevRecords.findIndex(e => String(e.id) === String(response.data.deleteData.id))
    if (index !== -1) { prevRecords.splice(index, 1) }
    return [...prevRecords]
  })
}

export const submitRecord = (id, setRecords, navigate) => async (e) => {
  e.preventDefault()
  const instance = createInstance()
  const form = document.getElementById('record-form')
  const inputs = form.getElementsByTagName('input')
  const select = form.getElementsByTagName('select')[0]
  const newRecord = { categoryId: Number(select.value) }
  for (const input of inputs) {
    newRecord[input.name] = input.name === 'amount' ? Number(input.value) : input.value
  }
  try {
    const returnRecord = id
      ? (await instance.put(`/records/${id}`, newRecord)).data.updateData
      : (await instance.post('/records', newRecord)).data.postData
    returnRecord.display = true
    setRecords(prevRecords => {
      const deletePosition = prevRecords.findIndex(e => String(e.id) === String(id))
      if (deletePosition !== -1) { prevRecords.splice(deletePosition, id ? 1 : 0) }
      let [insertPosition, willInsert] = [null, true]
      for (let i = 0, j = true; i < prevRecords.length; i++) {
        prevRecords[i].display = true
        if (j && (new Date(returnRecord.date)).getTime() >= (new Date(prevRecords[i].date)).getTime()) {
          if (returnRecord.id === prevRecords[i].id) { willInsert = false } else { insertPosition = i }
          j = false
        }
      }
      if (willInsert) { prevRecords.splice(insertPosition, 0, returnRecord) }
      return [...prevRecords]
    })
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}

export const filterByCategory = (setRecords) => () => {
  const selectOption = document.getElementById('filterSelect').value

  setRecords(prevRecords => {
    prevRecords.forEach(e => {
      if (selectOption === 'all' || String(selectOption) === String(e.categoryId)) { e.display = true } else { e.display = false }
    })
    return [...prevRecords]
  })
}

export const signIn = (setIsSignin, navigate) => async (e) => {
  e.preventDefault()
  const signInData = {}
  for (const input of document.getElementById('signInForm').getElementsByTagName('input')) {
    signInData[input.name] = input.value
  }
  const response = await axios.post(`${process.env.REACT_APP_BACK_END_HOST}/users/signin`, signInData)
  window.localStorage.setItem('jwtToken', response.data.token)
  setIsSignin(true)
  navigate('/')
}

export const signUp = (navigate) => async (e) => {
  e.preventDefault()
  const signUpData = {}
  for (const input of document.getElementById('sign-up-form').getElementsByTagName('input')) {
    signUpData[input.name] = input.value
  }
  const response = await axios.post(`${process.env.REACT_APP_BACK_END_HOST}/users/signup`, signUpData)
  if (response?.data?.status && response?.data?.message === '成功註冊') {
    navigate('/')
  }
}
