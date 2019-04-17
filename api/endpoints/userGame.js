
const express = require('express')
const router = express.Router()

const { db } = require('../db')
const { createGame, getUserGamebyID, getAllUsersInGame } = require('../db/userGame')

router.get('/:gameid', (request, response) => {
  getAllUsersInGame(request, db)
  .then(results => response.json(results))
  .catch(error => {
     console.log(error)
     response.json({error})
  })
})

router.get("/:gameid", (req, res) => {
  getUserGamebyID(req, db)
    .then( results => res.json(results))
    .catch( error => {
       console.log( error )
       res.json({ error })
     })
})

router.post('/create', (req, res) => {
  //Where is gameid and chatid coming from
  createUserGame(req, db)
    .then( results => res.json(results))
    .catch( error => {
       console.log( error )
       res.json({ error })
     })
})

module.exports = router
