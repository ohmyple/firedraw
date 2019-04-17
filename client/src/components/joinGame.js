
import React, {PureComponent} from 'react'
import {Link, Redirect}       from 'react-router-dom'
import styled                 from 'styled-components'
import posed, {PoseGroup}     from 'react-pose'
import request                from '../api'
import GamePassword           from '../components/gamePassword'

/****************************************************************/
import lockedicon from '../assets/icons/lock.svg'
/****************************************************************/


const FlexRow = styled.section`
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`
const Center = styled.div`
  display: flex;
  justify-content: center;
`
const Form = posed.div({
  init: {
    borderStyle: 'solid',
    borderColor: '#bdbdbd',
    borderWidth: '1px',
  },
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
})
const StyledForm = styled(Form)`
  width: 320px;
  height: 140px;
  background: #FFFFFF;
  box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.25);
`
const Card = posed(Form) ({
  pressable: true,
  hoverable: true,
  init: {
    scale: 1,
    background: `#FEFEFE`,
    boxShadow: '0px 1.5px 3px rgba(0, 0, 0, 0.25)',
  },
  hover: {
    scale: 1.02,
    background: '#FFFFFF',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  },
  press: {
    scale: 1,
    boxShadow: '0px 0.5px 1px rgba(0, 0, 0, 0.25)',
  },
})
const StyledCard = styled(Card)`
  width: 320px;
  height: 140px;
  cursor: pointer;
  user-select: none;
`
const Font = styled.p`
  color: #333333;
  font-family: IBM Plex Sans;
  font-weight: 500;
  font-size: 12px;
  text-align: center;
  padding: 0px;
  margin: 0 auto;
`
const P = styled(Font)`
  padding-bottom: 30px;
`
const H2 = styled(Font)`
  color: #828282;
  font-size: 14px;
`
const H1 = styled(Font)`
  font-size: 18px;
  padding-top: 17px;
`
const Icon = styled.div`
  height: 20px;
  width: 20px;
  margin: 5px;
  background-image: ${props =>
    props.locked ? `url(${lockedicon})` : 'none'};
  background-size: contain;
`

export default class JoinGame extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      joinGame: false,
      inputPassword: false,
    }
  }

  submit = () => {
    const {isPrivate} = this.props.game
    if (isPrivate) {
      this.promptPassword()
    } else {
      this.joinGame()
    }
  }

  joinGame = () => {
    const {gamename} = this.props.game
    const {password} = this.state
    const body = {password: password}
    request({endpoint: `/api/game/join/${gamename}`, body})
      .then(response => {
        if (response.status == 204) {
          this.setState({joinGame: true,})
        }
      })
      .catch(error => console.error('Error:', error))
  }

  promptPassword = () => {
    this.setState({inputPassword: true})
  }

  unpromptPassword = () => {
    this.setState({
      password: '',
      inputPassword: false
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render() {
    const {isPrivate, gamename, gameid, owner, partySize} = this.props.game
    const {joinGame, inputPassword} = this.state

    if(joinGame) {
      return  (
        <Redirect to={`/game/${gameid}`} />
      )
    }

    return (
      <FlexRow>
        <PoseGroup>
          {!inputPassword && [
            <StyledCard onClick={this.submit} key={'card'}>
              <H1>{gamename}</H1>
              <H2>host: {owner}</H2>
              <Center>
                <Icon locked={isPrivate}/>
              </Center>
              <P>{partySize}/6 Players</P>
            </StyledCard>
          ]}
        </PoseGroup>
        <PoseGroup>
          {inputPassword && [
            <StyledForm key={'form'}>
              <GamePassword
                submit={this.joinGame}
                back={this.unpromptPassword}
                onchange={this.handleChange}/>
            </StyledForm>
          ]}
        </PoseGroup>
      </FlexRow>
    )
  }
}
