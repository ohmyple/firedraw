
const CREATE_USER_GAME =
  `INSERT INTO usergame (userid, gameid, chatid) VALUES ($1, $2, $3) RETURNING userid`

const GET_USERGAME_BY_ID =
  `SELECT * FROM usergame WHERE gameid=$1`

const DELETE_GAME_BY_ID =
  `DELETE FROM game WHERE gameid=$1`

const CREATE_GAME =
  `INSERT INTO game (gamename, password) VALUES ($1, $2) RETURNING gameid`

const GET_GAME_BY_NAME =
  `SELECT * FROM game WHERE gamename = $1`

const GET_GAME_BY_ID =
  `SELECT * FROM game WHERE gameid = $1`

const GET_ALL_GAMES =
  `SELECT * FROM game`

const INSERT_CHAT_ID =
  `UPDATE game SET chatid=$1 WHERE gameid=$2`

const GET_USER_BY_ID =
  `SELECT * FROM users WHERE userid=$1`

module.exports = {
  CREATE_USER_GAME,
  GET_USERGAME_BY_ID,
  DELETE_GAME_BY_ID,
  CREATE_GAME,
  GET_GAME_BY_ID,
  GET_ALL_GAMES,
  INSERT_CHAT_ID,
  GET_USER_BY_ID,
  GET_GAME_BY_NAME
}
