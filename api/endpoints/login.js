const express = require('express')
const router = express.Router()

const { authenticate } = require('../passport/passport')

const db = require('../db')

router.get('/', (req, res, next) => {
  // res.status(401)
  res.send('login page')
})

router.post('/', authenticate)

module.exports = router
