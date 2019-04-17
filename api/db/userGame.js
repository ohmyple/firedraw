
const { db } = require('./index')
const {
  CREATE_USER_GAME,
  GET_USERGAME_BY_ID,
  GET_USER_BY_ID,
} = require('./queires')

const createUserGame = (username, gameid, db) => (
  db.one(CREATE_USER_GAME, [username, gameid, gameid])
)

const getUserGamebyID = (req, db) => {
  const { gameid } = req.params

  return db.any(GET_USERGAME_BY_ID, gameid)
}

const getAllUsersInGame = (req, db) => {
  const { gameid } = req.params

  return db.task(t => {
      return t.any(GET_USERGAME_BY_ID, gameid)
        .then(userGames => {
          const users = userGames.map(userGame => {
            return user = t.one(GET_USER_BY_ID, userGame.userid)
          })
          return Promise.all(users)
        })
    })
}

module.exports = { createUserGame, getUserGamebyID, getAllUsersInGame }
