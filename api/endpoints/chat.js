
const express = require('express')
const { io }  = require('../messaging')
const moment  = require('moment')
const router  = express.Router()

const isAuthenticated = require('../passport/isAuthenticated')

//Probably need some type of auth middleware here
router.post("/:roomId", isAuthenticated, (req, res) => {
  const time = moment().format('LT')
  const { username, profilephoto } = req.user
  const { message } = req.body
  const { roomId } = req.params

  const newMessage = {
    username,
    message,
    time,
    profilephoto
  }

  io.emit(`newMessage-${roomId}`, newMessage)

  res.sendStatus(204)
})

module.exports = router
