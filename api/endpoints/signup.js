const express = require('express')
const router = express.Router()

const { db } = require('../db')

const bcrypt = require('bcrypt')
const SALT = 10

router.get('/', (req, res, next) => {
  res.send('signup page get')
})

// TODO: duplicated code atm, resolve later
function validateEmail(email) {
  const validEmailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  return validEmailRegex.test(email)
}

router.post('/', (req, res, next) => {
  const { username, email, password } = req.body

  if(!validateEmail(email)) {
    console.log('invalid email: ' + email)
    res.send('invalid email')
    return
  }

  bcrypt.hash(password, SALT, (err, hash) => {
    db.one(`INSERT INTO users (username, email, password) VALUES( $1, $2, $3) RETURNING userid`, [username, email, hash])
    .catch( err => {
      if(err.constraint === 'users_email_key' ) {
        console.log('inside of email err: ' + err.constraint)
        res.send('email already used')
        throw err
      } else if(err.constraint === 'users_username_key' ) {
        console.log('inside of username err: ' + err.constraint)
        res.send('username already used')
        throw err
      } else {
        res.send('something else went wrong')
        throw err
      }
    })
    .then(user => {
      req.login(user, err => {
        if(err) {
          return next(err)
        }
        res.send(req.session)
      })
    })
    .catch(err => {
      console.log(err)
    })
  })
})

module.exports = router
