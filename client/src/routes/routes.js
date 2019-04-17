import React from 'react'
import {
  BrowserRouter as
  Router,
  Route,
  Link,
  Redirect,
  Switch,
  HashRouter } from 'react-router-dom'

import SignUpScreen     from '../screens/signUpScreen'
import LoginScreen      from '../screens/loginScreen'
import LobbyScreen      from '../screens/lobbyScreen'
import CreateGameScreen from '../screens/createGameScreen'
import GameScreen       from '../screens/gameScreen'
import BlankScreen      from '../screens/blankScreen'
import NavBar           from '../containers/navBar'
import ChatContainer    from '../containers/chatContainer'
import ProtectedRoute   from '../api/protectedRoute'
import socket           from '../messaging'

//All Routes will go here
const Routes = () => (
  <HashRouter>
    <div>
      <NavBar/>
      {/* for navBar and chat to work everything needs to be wrapped in
        an absolute positioned div

        look into routes with subroutes

        */}
        <Route exact path="/" component={LoginScreen} />
        <Route exact path="/login" render={() => (
          <Redirect to="/" />
        )}/>
        <Route
          exact path="/lobby"
           render={(props) => <LobbyScreen {...props} socket={socket}/>}/>
        <Route exact path="/signup" component={SignUpScreen} />
        <Route exact path="/newgame" component={CreateGameScreen}/>
        <Route exact path="/game/:id" render={(props) => <GameScreen {...props} socket={socket}/>}/>
    </div>
  </HashRouter>
)

export default Routes
