
const findUsers = db => _ =>
  db.any('SELECT * FROM users')

const findUserById = db => id =>
  db.one('SELECT * FROM users WHERE userid=$1', [id])

const insertUser = db => (username, email, hash) =>
  db.one(`INSERT INTO users (username, email, password) VALUES( $1, $2, $3) RETURNING userid`, [username, email, hash])

const setImage = db => (photo, id) =>
  db.one(`UPDATE users SET profilephoto=$1 WHERE userid=$2`, [photo, id])

const deleteUser = db => id => 
  db.result('DELETE FROM users WHERE userid=$1', [id])

const userInit = db => ({
  findUsers: findUsers(db),
  findUserById: findUserById(db),
  insertUser: insertUser(db),
  setImage: setImage(db),
  deleteUser: deleteUser(db)
})

module.exports = userInit