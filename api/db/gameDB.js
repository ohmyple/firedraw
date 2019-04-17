const findGames = db => _ =>
  db.any(`SELECT * FROM game`)

const findGameById = db => id =>
  db.any(`SELECT * FROM game WHERE gameid = $1`, [id])

const insertGame = db => (gamename, password) =>
  db.one('INSERT INTO game (gamename, password) VALUES ($1, $2) RETURNING gameid', [gamename, password])

const deleteGame = db => id =>
  db.result('DELETE FROM game WHERE gameid=$1', [id])

const gameInit = db => ({
  findGames: findGames(db),
  findGameById: findGameById(db),
  insertGame: insertGame(db),
  deleteGame: deleteGame(db)
})

module.exports = gameInit