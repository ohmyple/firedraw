
const express = require('express')
const router = express.Router()

const { db } = require('../db')

router.get('/:id', (req, res, next) => {
  res.send('get the answer')
})

module.exports = router