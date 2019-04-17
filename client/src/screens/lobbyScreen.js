
import React, {PureComponent}       from 'react'
import {Link, Redirect}             from 'react-router-dom'
import styled, {createGlobalStyle}  from 'styled-components'
import posed, {PoseGroup}           from 'react-pose'
import request                      from '../api'
import {getGameObjs}                from '../api/gameObject'
import Chat                         from '../containers/chatContainer'
import JoinGame                     from '../components/joinGame'
import Header                       from '../components/header'

const Container = styled.div`
  padding-top: 65px;
  margin-right: 350px
`
const FlexRow = styled.section`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`
const FlexCol = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
`
const Button = posed.div({
  pressable: true,
  hoverable: true,
  init: {
    background: '#479E7D',
    scale: 1,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  },
  hover: {
    background: '#50B28D',
  },
  press: {
    scale: 0.95,
    boxShadow: '0px 0.1px 0.2px rgba(0, 0, 0, 0.25)',
  },
})
const StyledButton = styled(Button)`
  height: 59px;
  width: 322px;
  border-radius: 15px;
  background: #479E7D;
  color: #f2f2f2;
  padding: 0px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  user-select: none;
`
const H1 = styled.h1`
  font-family: 'IBM Plex Sans';
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  padding: 12px;
  margin: 0 auto;
`
const NoGames = posed(H1)({
  init: {
    color: '#333333',
  },
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    rotate: 360,
    scale: 0,
    transition: {
      duration: 800,
    },
  },
})

export default class LobbyScreen extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      games: [],
      createGame: false,
    }
  }

  componentDidMount() {
    this.updateGames()
    this.timerID = setInterval(
      () => this.updateGames(),
      10000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  createGame = () => {
    this.setState({createGame: true,})
  }

  updateGames = () => {
    console.log('updating games list')

    getGameObjs()
      .then(res => {
        if (Object.keys(res).length !== 0) {
          this.setState({
            games: [res[Object.keys(res)[0]]]
          })
        }
      })
  }

  render() {
    this.props.location.screen = "Lobby!"

    const {games, createGame} = this.state
    const {socket} = this.props

    if (createGame) {
      return(
        <Redirect to={"/newgame"} />
      )
    }

    const gamesList = games => games.map((game, i) => {
      return (
        <JoinGame key={game.gameid}
        game={game}
        color={Math.round(Math.random() * 3)}/>
      )
    })

    return (
      <div>
        <Chat socket={socket} />
        <Container>
          <FlexCol>
            <StyledButton onClick={this.createGame}>
              <H1>Create Game</H1>
            </StyledButton>
            <FlexRow>
              <PoseGroup>
                {[(games.length === 0) &&
                  <NoGames key='sorry'>sorry no games..<br/>¯\_(ツ)_/¯</NoGames>
                ]}
              </PoseGroup>
              {gamesList(games)}
            </FlexRow>
          </FlexCol>
        </Container>
      </div>
    )
  }
}
