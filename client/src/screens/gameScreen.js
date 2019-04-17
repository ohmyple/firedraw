
import React, {PureComponent}       from 'react'
import {Link, Redirect}             from 'react-router-dom'
import styled, {createGlobalStyle}  from 'styled-components'
import posed                        from 'react-pose'
import {
  getCurrentGame,
  getCurrentUser,
  getUsers,
}                                   from '../api/lib'
import {
  getGameObjById,
  getPrompt,
  setTimer,
}                                   from '../api/gameObject'
import {
  addGameAvatar,
  addPromptDrawing,
}                                   from '../api/images'
import Chat                         from '../containers/chatContainer'
import JoinGame                     from '../components/joinGame'
import GameAvatar                   from '../components/gameAvatar'
import GameRoom                     from '../components/gameRoom'
import GameDraw                     from '../components/gameDraw'
import GameGuess                    from '../components/gameGuess'
import GameVote                     from '../components/gameVote'
import NoGame                       from '../components/noGame'
import QuitButton                   from '../components/quitButton'

const Container = styled.div`
  margin-right: 350px;
`

export default class GameController extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      progress: 1,
      prompt: '',
      isPlaying: false,
      isSpectating: false,
      stage: 'avatar',
      game: {
        init: false,
        gamename: '',
        gameid: this.props.match.params.id,
        chatid: '',
      },
      user: {
        init: false,
        username: '',
        userid: '',
      },
      gameState: {
        init: false,
        gameObj: {},
      },
    }
  }

  componentDidMount() {
    const {id} = this.props.match.params
    this.getCurrentUser()
    this.getCurrentGame(id)
    this.initSocket()
  }

  componentDidUpdate() {
    const {user, gameState, isPlaying, isSpectating, stage} = this.state
    if (!isPlaying && !isSpectating && gameState.init && user.init) {
      const users = gameState.gameObj.users.map(user => user.name)
      if (!users.includes(user.username)){
        console.log('USER NOT A PLAYER')
        this.setState({isSpectating: true})
      }
    }
    if (stage != 'none' && stage != 'avatar') {
      if (gameState.init) {
        if (stage !== gameState.gameObj.currentPage) {
          this.setState({stage: gameState.gameObj.currentPage})
        }
      }
    }
  }

  getCurrentGame = (gameid) => {
    getCurrentGame(gameid)
      .then(res => {
        this.setState({
          game: {
            init: true,
            ...res.game,
          },
        })
      })
    getGameObjById(gameid)
      .then(res => {
        if (!res) {
          this.setState({stage: 'none'})
        } else {
          this.setState({
            gameState: {
              init: true,
              gameObj: res,
            }
          })
        }
      })
  }

  getCurrentUser = () => {
    getCurrentUser()
      .then(res => this.setState({
          user: {
            init: true,
            ...res.user,
          },
        }))
  }

  getUsers = (gameid) => {
    return getUsers(gameid)
    .then(res => this.setState(res))
  }

  uploadAvatar = (image) => {
    const {user, game} = this.state
    addGameAvatar(image, user.username, game.gameid)
      .then(res => {
        this.setState({stage: res.stage})
      })
  }

  uploadDrawing = (image) => {
    const {user, game} = this.state
    addPromptDrawing(image, user.username, game.gameid)
      .then(res => this.setState(res))
    this.setTimer(game.gameid)
  }

  setTimer = (gameid) => {
    setTimer(gameid)
  }

  initSocket = () => {
    const {socket} = this.props
    const {game} = this.state

    socket.on(`updateGameState-${game.gameid}`, (gameObj) => {
      this.setState(state => {
        return {gameState: {
          init: state.gameState.init,
          gameObj: gameObj,
        }}
      })
    })
    socket.on(`changeStage-${game.gameid}`, (gameObj) => {
      this.setState(state => {
        if (gameObj.currentPage === 'drawing') {
          getPrompt(game.gameid)
            .then(res => this.setState(res))
        }
        return {gameState: {
          init: state.gameState.init,
          gameObj: gameObj,
        }}
      })
    })
    socket.on(`timer-${game.gameid}`, time => this.setProgress(time))
  }

  setProgress= (time) => {
    if (time === -1) {
      this.setState({progress: -1})
    } else {
      const progress =  0.165 * time
      this.setState({progress: progress})
    }
  }

  quit = () => {
    console.log('QUIT')
  }

  render() {
    const {socket} = this.props
    const {user, game, gameState, stage, progress, prompt} = this.state
    this.props.location.screen = game.gamename
    console.log('GAMESCREEN:RENDER: ', this.state)

    const gamescreen = stage => {
      if (stage === 'none') {
        return (<NoGame />)
      }
      if (stage === 'avatar') {
        return (
          <div>
            <GameAvatar user={user} uploadImage={this.uploadAvatar} />
          </div>
          )
      }
      if (stage === 'waiting') {
        return (
          <div>
            <GameRoom
              user={user}
              users={gameState.gameObj.users}
              op={gameState.gameObj.owner}
              game={game} />
          </div>
        )
      }
      if (stage === 'drawing') {
        return (
          <div>
            <GameDraw
              user={user}
              progress={progress}
              caption={prompt}
              uploadImage={this.uploadDrawing} />
          </div>
        )
      }
      if (stage === 'guess') {
        return (
          <div>
            <GameGuess
              users={gameState.gameObj.users}
              drawing={gameState.gameObj.currentDrawing}
              progress={progress} />
          </div>
        )
      }
      if (stage === 'vote') {
        console.log('VOTE')
        return (
          <div>
            <GameVote
              users={gameState.gameObj.users}
              drawing={{}}
              progress={progress} />
          </div>
        )
      }
    }

    return (
      <div>
        <Chat socket={socket} />
        <Container>
          {gamescreen(stage)}
        </Container>
      </div>
    )
  }
}
