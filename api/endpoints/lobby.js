const express = require('express')
const router = express.Router()

const isAuthenticated = require('../passport/isAuthenticated')

router.get('/', isAuthenticated, (req, res, next) => {
  const { user } = res.locals

  res.send(user)
})

module.exports = router
