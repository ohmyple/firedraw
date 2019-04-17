
import React, {PureComponent}   from 'react'
import {Link, Redirect}         from 'react-router-dom'
import styled                   from 'styled-components'
import posed                    from 'react-pose'
import Header                   from './header'

const FlexRow = styled.section`
  padding-top: 100px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`
const Center = styled.div`
  display: flex;
  flex-flow: col nowrap;
  justify-content: center;
`
const Button = posed.div({
  pressable: true,
  hoverable: true,
  init: {
    background: '#EB5757',
    scale: 1,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  },
  hover: {
    background: '#f76d6d',
  },
  press: {
    scale: 0.95,
    boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.25)',
  },
})
const StyledButton = styled(Button)`
  height: 59px;
  width: 322px;
  border: none;
  border-radius: 15px;
  padding: 0px;
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  cursor: pointer;
  user-select: none;

  font-family: 'IBM Plex Sans';
  font-size: 24px;
  line-height: 59px;
  color: #F2F2F2
  text-align: center;
`
const H1 = styled.h1`
  font-family: 'IBM Plex Sans';
  color: #828282;
  font-size: 36px;
  font-weight: 400;
  font-style: italics;
  text-align: center;
  padding: 12px;
  margin: 0 auto;
`

export default class NoGame extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      goToLobby: false,
    }
  }

  submit = () => {
    this.setState({goToLobby: true,})
  }

  render() {
    const {goToLobby} = this.state
    if (goToLobby) {
      return (
        <Redirect to={"/lobby"} />
      )
    }

    return (
      <FlexRow>
        <div>
          <FlexRow>
            <H1>): </H1>
            <Header text={`we can't find your game!`} />
          </FlexRow>
          <Center>
            <StyledButton onClick={this.submit}>Back to Lobby</StyledButton>
          </Center>
        </div>
      </FlexRow>
    )
  }
}
