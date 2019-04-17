
// passport setup
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const bcrypt = require('bcrypt')

const { db } = require('../db')

passport.serializeUser((user, done) => {
  done(null, user.userid)
})

passport.deserializeUser((id, done) => {
  db.one('SELECT userid, username, profilephoto FROM users WHERE userid=$1', [id])
  .then(user => done(null, user))
  .catch(error => done(error, {}))
})

const checkPassword = password => user => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password).then(isEqual => {
      if(isEqual === true) {
        return resolve(user)
      }
      return reject( new Error('Invalid credentials.'))
    })
  })
}

passport.use(new LocalStrategy(
  (username, password, done) => {
    db.one('SELECT * FROM users WHERE $1 IN(username, email)', [username])
    .then(user => {
      const userPassword = checkPassword(password)
      const userobj = userPassword(user)

      return userobj
    })
    .then(user => done(null, user))
    .catch(error => done(null, false, error.message))
  }
))

const authSetting = {
  successRedirect: './redirect',
  failureRedirect: './login'
}

module.exports = {
  passport,
  authenticate: passport.authenticate('local', authSetting)
}
