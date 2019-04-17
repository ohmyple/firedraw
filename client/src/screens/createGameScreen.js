
import React, {Component}     from 'react'
import {Link, Redirect}       from 'react-router-dom'
import {createGlobalStyle}    from 'styled-components'
import request                from '../api'
import {createGame}           from '../api/lib'
import NewGameForm            from '../components/newGameForm.js'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F2F2F2;
    align-items: center;
    vertical-align: middle;
  }
`
export default class NewGameScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dup: 0,
      gamename: '',
      password: '',
      gameid: '',
      joinGame: false,
    }
  }
  componentDidMount() {
    request({endpoint: '/api/lobby', method: 'GET'})
      .then(res => res.json())
      .then(res => this.setState({username: res.username}))
      .catch(err => new Error(err))
  }

  handleChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    this.createGame()
  }

  createGame = () => {
    let {gamename, password, username} = this.state
    gamename = gamename.trim()
    password = password.trim()

    if (!gamename) {
      gamename = `${username}'s Game!`
      this.setState({gamename: gamename})
    }

    createGame(gamename, password)
      .then(res => {
        this.setState(res)
      })
  }

  render() {
    this.props.location.screen = "Create Game"
    const {dup, joinGame, gameid, gamename} = this.state

    if (joinGame) {
      return  (
        <Redirect to={`/game/${gameid}`} />
      )
    }

    return (
      <div>
        <NewGameForm
          dup={dup}
          submit={this.onSubmit}
          onchange={this.handleChange}
        />
      </div>
    )
  }
}
