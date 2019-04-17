import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes/routes.js'
import * as serviceWorker from './serviceWorker'
import profilePhoto from './assets/photos/me.jpg'
import './index.css'

 // <ChatContainer socket={socket} />

ReactDOM.render(
  <Routes />
  ,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
