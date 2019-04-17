
const express = require('express')
const router = express.Router()

const { s3 } = require('../db')

router.post('/', s3.single('avatar'),
  (req, res, next) => {
    return res.json({ imageUrl: req.file.location })
})

module.exports = router
