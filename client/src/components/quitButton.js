
import React, {PureComponent}   from 'react'
import styled                   from 'styled-components'
import posed                    from 'react-pose'

const QuitWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  display: flex;
  flex-flow: column-reverse nowrap;
  justify-content: flex-start;
  z-index: -10;
`
const QuitContainer = styled.section`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`
const Button = posed.div({
  pressable: true,
  hoverable: true,
  init: {
    height: '50px',
    background: '#EB5757',
    scale: 1,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  },
  hover: {
    height: '80px',
    background: '#f76d6d',
  },
  press: {
    height: '90px',
    boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.25)',
  },
})
const Quit = styled(Button)`
  position: relative;
  width: 100vw;
  border: none;
  padding: 0px;
  margin-top: 20px;
  margin-right: 350px;
  cursor: pointer;
  user-select: none;

  font-family: 'IBM Plex Sans';
  font-size: 24px;
  line-height: 59px;
  color: #F2F2F2
  text-align: center;
`

export default class NoGame extends PureComponent {
  render() {
    return (
      <QuitWrapper>
        <QuitContainer>
          <Quit onClick={this.props.submit}>Exit to Lobby</Quit>
        </QuitContainer>
      </QuitWrapper>
    )
  }
}
