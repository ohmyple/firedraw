
import io from 'socket.io-client'

let socketUrl = ''

if (process.env.NODE_ENV === 'development') {
  socketUrl = "http://localhost:5000/"
} else {
  socketUrl = 'https://firedraw.herokuapp.com/'
}

const socket = io(socketUrl)

export default socket
