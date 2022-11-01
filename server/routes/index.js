const express = require('express')
const router = express.Router()
//
const user = require('./modules/user')
const record = require('./modules/record')
const category = require('./modules/category')
const {
  authenticator: { jwtAuthenticator }
} = require('../middlewares')
//
router.use('/users', user)
router.use('/records', jwtAuthenticator, record)
router.use('/categories', jwtAuthenticator, category)

//
module.exports = router
