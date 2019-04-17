
const express = require('express')
const router  = express.Router()

const login      = require('./login')
const signup     = require('./signup')
const logout     = require('./logout')
const lobby      = require('./lobby')
const answer     = require('./answer')
const chat       = require('./chat')
const drawing    = require('./drawing')
const game       = require('./game')
const user       = require('./user')
const vote       = require('./vote')
const imgUpload  = require('./imageUpload')
const userGame   = require('./userGame')
const success    = require('./successfulRedirect')
const gameObject = require('./gameObject');

router.use('/', lobby)
router.use('/login', login)
router.use('/signup', signup)
router.use('/logout', logout)
router.use('/lobby', lobby)

router.use('/answer', answer)
router.use('/chat', chat)
router.use('/drawing', drawing)
router.use('/game', game)
router.use('/user', user)
router.use('/vote', vote)
router.use('/uploadImage', imgUpload)
router.use('/userGame', userGame)
router.use('/redirect', success)
router.use('/gameObject', gameObject)

module.exports = router
