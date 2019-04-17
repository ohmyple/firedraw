
const pg  = require('pg')
const pgp = require('pg-promise')()
const s3  = require('./s3')

let connection = ''

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
  connection = process.env.HEROKU_POSTGRESQL_TEAL_URL
} else {
  connection = process.env.DATABASE_URL
}

const db = pgp(connection)
pg.defaults.ssl = true

module.exports = { db, s3, connection }
