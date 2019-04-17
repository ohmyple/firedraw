
const express = require('express')
const { io }  = require('../messaging')
const { currentGames } = require('../db/game');
const router = express.Router()

router.get('/', (req, res) => {
  try {
    res.send(currentGames)
  } catch(err) {
    console.error(err)
  }
})

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params
    const gameById = currentGames[id]

    res.send(gameById)
  } catch(err) {
    console.error(err)
  }
})

router.get('/getUsers/:id', (req, res) => {
  try {
    const { id } = req.params
    const users = currentGames[id].getAllUsers()

    res.send(users)
  } catch(err) {
    console.error(err)
  }
})

router.get('/getPrompts/:roomId', (req, res) => {
  try {
    const { roomId } = req.params
    const currentGames = currentGames[roomId]

    currentGame.setPromptAll()

    const userPrompts = currentGame.getAllUsers()

    io.emit(`promptScreen-${roomId}`, userPrompts)
    res.sendStatus(200)

  } catch(err) {
    console.error(err)
  }
})

router.get('/getCurrentDrawing/:roomId', (req, res) => {
  try {
    const { roomId } = req.params
    const currentGame = currentGames[roomId]

    res.send(currentGame.getCrurrentDrawing() )
  } catch(err) {
    console.log(err)
    res.sendStatus(400)
  }
})

router.get('/configRound/:roomId', (req, res) => {
  try {
    const { roomId } = req.params

    currentGames[roomId].initRound()
    res.sendStatus(204)
  } catch(err) {
    cosole.log(err)
    res.sendStatus(400)
  }
})

router.get('/setCurrentDrawing/:roomId', (req, res) => {
  try {
    const { roomId } = req.params

     currentGames[roomId].nextDrawing()
  } catch(err) {
    res.sendStatus(400)
    console.log(err)
  }
})

router.get('/getCurrentDrawing/:roomId', (req, res) => {
  try {
    const { roomId } = req.params
    return currentGames[roomId].getCrurrentDrawing()
  } catch(err) {
    res.sendStatus(400)
    console.log(err)
  }
})

router.get('/getPrompt/:roomId', (req, res) => {
  try {
    const{ roomId } = req.params
    const currentGame = currentGames[roomId]
    const { username } = req.user
    const prompt = currentGame.getPromptByName(username)
    res.send({prompt: prompt})
  } catch(err) {
    res.sendStatus(400)
    console.error(err)
  }
})

router.get('/setTimer/:roomId', (req, res) => {
  try {
    const{ roomId } = req.params
    const currentGame = currentGames[roomId]
    const { username } = req.user
    currentGame.setTimer(5)
    res.sendStatus(204)
  } catch(err) {
    res.sendStatus(400)
    console.error(err)
  }
})

router.post('/addPromptDrawing/:id', (req, res) => {
  try {
    const { id } = req.params
    const { drawing, username } = req.body
    const addDrawingToObject = currentGames[id].setDrawingUrlByName(username, drawing)
    res.sendStatus(204)
    currentGames[id].setCurrentPage('guess')
    currentGames[id].setGameDrawings()
    io.emit(`updateGameState-${id}`, currentGames[id])
  } catch(err) {
    console.error(err)
  }
})

router.post('/addGameAvatar/:gameid', (req, res) => {
  try {
    const { gameid } = req.params
    const { avatar, username } = req.body
    const addGameAvatarToGame = currentGames[gameid].setAvatarByName(username, avatar)
    io.emit(`updateGameState-${gameid}`, currentGames[gameid])
    res.sendStatus(204)
  } catch(err)  {
    console.error(err)
  }
})

router.post('/setPage/:id', (req, res) => {
  try {
    const { id } = req.params
    const { page } = req.body
    currentGames[id].setCurrentPage(page)

    res.sendStatus(204)
  } catch(err) {
    console.log(err)
    res.sendStatus(400)
  }
})

router.post('/startGame/:id', (req, res) => {
  try {
    const { id } = req.params
    const { username } = req.user
    const game = currentGames[id]
    const owner = game.owner

    if(username === owner) {
      res.sendStatus(200)
      game.setPromptAll()
      game.setCurrentPage('drawing')
      io.emit(`changeStage-${id}`, game)
      game.setTimer(5)
      return game.setLock()
    }

  }catch(err) {
    res.sendStatus(403)
    console.error(err)
  }
})

router.post('/leftLobby/:id', (req, res) => {
  try {
    const { id } = req.params
    const { username } = req.body
    const owner = currentGames[id].owner
    const users = currentGames[id].getUsersNameList()

    if(owner === username && !currentGames[id].changeOwner() ) {
      delete currentGames[id]
    }
    else if(users.includes(username) ) {
      currentGames[id].removeUserByName(username)
    }
    res.sendStatus(204)
  } catch(err) {
    res.sendStatus(400)
    console.log(err)
  }
})


module.exports = router
