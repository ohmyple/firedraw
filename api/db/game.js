
const bcrypt             = require('bcrypt')
const { db }             = require('./index')
const GameObject         = require('./gameObject')
const { createUserGame } = require('./userGame');

const {
  DELETE_GAME_BY_ID,
  CREATE_GAME,
  GET_GAME_BY_ID,
  GET_ALL_GAMES,
  INSERT_CHAT_ID,
  GET_GAME_BY_NAME
} = require('./queires')

const currentGames = {}
const SALT = 10

const getAllGames = db => (
  db.any(GET_ALL_GAMES)
)

const getGameByID = (req, db) => {
  const { gameid } = req.params
  return db.one(GET_GAME_BY_ID, gameid)
}

const createGame = (req, db) => {
  const { gamename, password } = req.body

  let hash = bcrypt.hashSync(password, SALT)
  if(password === '') {
    hash = null
  }
  return db.one(CREATE_GAME, [gamename, hash])
    .then(res => {
      const { username } = req.user
      const gameid  = res.gameid
      let isPrivate = true
      if (!password) {
        isPrivate = false
      }

      const newGame = new GameObject(username, gameid, gamename, isPrivate)

      currentGames[gameid] = newGame
      updateChatID(res)
      createUserGame(username, gameid, db)

      return res
  })
}

const joinGame = (req, db) => {
  const { gamename } = req.params
  const { password } = req.body

  return db.one(GET_GAME_BY_NAME, gamename)
    .then(game => {
      if(game.password != null && !bcrypt.compareSync(password, game.password) ) {
        throw { name: 'invalid password' }
      }
      return game
    })
    .then(result => {
      const { username } = req.user
      const gameid = result.gameid
      const game = currentGames[gameid]

      if(!game.checkUser(username)) {
        game.addUserByName(username)
      }
    })
}

  const validateGameId = id => {
    if(currentGames.hasOwnProperty(id) ) {
      return true
    } else {
      return false
    }
  } 

const deleteGameByID = (req, db) => {
  const { gameid } = req.params
  delete currentGames[gameid]

  return db.result(DELETE_GAME_BY_ID, gameid)
}

const updateChatID = req => {
  const gameid = req.gameid
  return db.any(INSERT_CHAT_ID, [gameid, gameid])
}

module.exports = {
  getAllGames,
  getGameByID,
  createGame,
  deleteGameByID,
  updateChatID,
  joinGame,
  currentGames,
  validateGameId
}
