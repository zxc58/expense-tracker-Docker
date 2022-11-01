if (process.env.NODE_ENV !== 'production'&& process.env.NODE_ENV !== 'docker') {
  const result = require('dotenv').config()
  if (result.error) {
    throw new Error('Please provide .env file')
  }
}
require('./models')
const express = require('express')
const cors = require('cors')
//
const usePassport = require('./config/passport')
const router = require('./routes')
//
const app = express()
//
app.use(cors())
app.use(express.json())
usePassport(app)
app.use('/api', router)
app.use('/', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type')
  res.send('fofof')
})
app.use((error, req, res, next) => {
  res.json({ status: false, message: error.message, error: error.stack })
})
//
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`http://localhost:${process.env.PORT}`)
  })
}
//
module.exports = app
