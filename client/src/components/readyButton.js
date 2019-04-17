import React, {PureComponent} from 'react'
import styled                 from 'styled-components'
import posed                  from 'react-pose'
import {spring}               from 'popmotion'
import {startGame}       from '../api/gameObject'

const Prompt = styled.div`
  padding-top: 9em;
`
const Container = styled.div`
  border-radius: 15px;
`
const Button = posed.div({
  pressable: true,
  hoverable: true,
  init: {
    background: '#479e7d',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    scale: 1.0,
  },
  hover: {
    background: '#50B28D',
  },
  press: {
    boxShadow: '0px 0.1px 0.2px rgba(0, 0, 0, 0.25)',
    scale: 0.9,
    transition: {spring},
  },
})
const StyledButton = styled(Button)`
  height: 127px;
  width: 410px;
  border-radius: 15px;
  color: #f2f2f2;
  padding: 0px;
  margin: 0 auto;
  cursor: pointer;
`
const Title = styled.h1`
  font-family: 'IBM Plex Sans';
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  padding-top: 2rem;
  margin: 25px auto;
  user-select: none;
`
const SubTitle = styled.h1`
  font-family: 'IBM Plex Sans';
  color: #333333;
  font-size: 48px;
  font-weight: 300;
  text-align: center;
  color: black;
  padding: 20px;
  margin: 0 auto;
  user-select: none;
`
const SubSubTitle = styled(SubTitle)`
  font-size: 24px;
  padding: 5px;
`

export default class GameRoom extends PureComponent {
  submit = () => {
    this.setReady()
  }

  setReady = () => {
    const {gameid} = this.props
    startGame(gameid)
  }

  render() {
    const {username} = this.props

    return (
      <Prompt ref="prompt">
        <SubSubTitle>Host: {username}</SubSubTitle>
        <SubTitle>EVERYONE READY?</SubTitle>
        <Container onClick={this.submit}>
          <StyledButton>
            <Title>GO!</Title>
          </StyledButton>
        </Container>
      </Prompt>
    )
  }
}
