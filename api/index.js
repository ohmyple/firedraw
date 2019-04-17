
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const http              = require('http')
const express           = require("express")
const path              = require('path')
const bodyParser        = require('body-parser')
const endpoints         = require('./endpoints')
const { initSocket }    = require('./messaging')
const { passport }      = require('./passport/passport.js')
const sessionMiddleware = require('../config/session.js')

const app    = express()
const server = http.Server(app)
const port   = process.env.PORT || 5000

initSocket(server)

app.use(sessionMiddleware)
app.use(express.static(path.join(__dirname, '/../client/build')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', endpoints)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

server.listen(port, () => console.log(`listening on ${port}`))
