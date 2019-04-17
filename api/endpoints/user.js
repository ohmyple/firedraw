const express = require('express')
const router = express.Router()

const { db, s3 } = require('../db')
const isAuthenticated = require('../passport/isAuthenticated')

const validator = require('../passport/validate')

const bcrypt = require('bcrypt')
const SALT = 10

router.get('/', (req, res, next) => {
  res.send(req.user)
})

router.get('/:id', (req, res, next) => {
  const userid = req.params.id
  console.log(`get user by id=${userid}`)
  db.one('SELECT * FROM users WHERE userid=$1', [userid])
  .then(user => {
    res.json(user)
  })
  .catch(err => {
    console.log(err)
    res.send('cannot find user')
  })
})

router.post('/', (req, res, next) => {
  const { username, email, password } = req.body

  if(!validator.validateEmail(email, res) ) return

  bcrypt.hash(password, SALT, (err, hash) => {
    db.one(`INSERT INTO users (username, email, password) VALUES( $1, $2, $3) RETURNING userid`, [username, email, hash])
    .catch( err => {
      validator.dbInvalidHandler(err, res)
      throw err
    })
    .then(user => {
      req.login(user, err => {
        if(err) {
          return next(err)
        }
        return res.json(user)
      })
    })
    .catch(err => {
      console.log(err)
    })
  })
})

router.put('/', isAuthenticated, s3.single('avatar'),
  (req, res, next) => {
    const profilephoto = req.file.location
    const { user } = res.locals

    res.send(user)

    return db.any(`UPDATE users SET profilephoto=$1 WHERE userid=$2`, [profilephoto, req.user.userid])
    .catch(err => console.log(err))
})

// TODO: remove cookie (session or connect)
router.delete('/:id', (req, res, next) => {
  db.result('DELETE FROM users WHERE userid=$1', [req.params.id])
  .then( result => {
    res.json(result)
  })
  .catch(err => {
    console.log(err)
    res.send('error')
  })
})

module.exports = router
