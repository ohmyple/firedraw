
const io  = require('socket.io')()
const sessionMiddleware = require('../../config/session.js')

const initSocket = server => {
  io.use(({ request }, next) => {
   sessionMiddleware(request, request.res, next)
 })

  io.listen(server)
}

//Figure out what io.on does before scrapping
io.on('connection', socket => {
  console.log("connected")
  // socket.on('newMessage', message => {
  //    io.emit('newMessage', message)
  //
  //     console.log(message)
  //   })

  io.on('disconnect', () => {
    // delete users[user]
    console.log('user disconnected')
  })
})

module.exports = { initSocket, io }
