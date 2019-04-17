
const express = require('express')
const router = express.Router()

const { db } = require('../db')

const {
  getAllGames,
  getGameByID,
  createGame,
  deleteGameByID,
  updateChatID,
  joinGame,
  currentGames,
  validateGameId
} = require('../db/game')

router.get('/', (req, res) => {
  getAllGames(db)
  .then(results => res.json(results))
  .catch(error => {
     console.log(error)
     res.json({error})
  })
})

router.get('/:gameid', (req, res) => {
  getGameByID(req, db)
  .then(results => res.json(results))
  .catch(error => {
     console.log(error)
     res.json({error})
  })
})

router.post('/create', (req, res) => {
  createGame(req, db)
  .then(result => res.send(result))
  .catch(error => {
    res.json({error})
  })
})

router.post('/join/:gamename', (req, res) => {
  joinGame(req, db)
  .then( _ => {
    res.sendStatus(204)
  })
  .catch(err => {
    if(err.name === 'invalid password') {
      res.sendStatus(403)
    } else if(err.name === 'already joined') {
      res.sendStatus(409)
    } else {
      res.sendStatus(404)
    }
    console.log(err)
  })
})

router.delete('/:gameid', (req, res) => {
  deleteGameByID(req, db)
  .then(result => {
    console.log('game deleted')
    res.send(result)
    })
  .catch(err => {
    console.log(err)
    res.json(err)
  })
})

module.exports = router
