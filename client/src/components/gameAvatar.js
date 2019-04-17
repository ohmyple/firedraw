
import React, {PureComponent}   from 'react'
import styled                   from 'styled-components'
import posed                    from 'react-pose'
import {uploadImage}            from '../api/images'
import Canvas                   from './canvas'
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
const Error = styled.h1`
  font-family: 'IBM Plex Sans';
  font-weight: 400;
  font-size: 16px;
  color: #828282
  text-align: center;
`

export default class GameAvatar extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
    }
  }

  submit = () => {
    const {username} = this.props.user
    if (username) {
      this.setState({error: false})
      const canvas = this.refs.styledCanvas.refs.canvas
      canvas.toBlob(blob => {
        uploadImage(blob, username)
          .then(res => {
            this.props.uploadImage(res)
          })
      }, 'image/png', 0.92)
    } else {
      this.setState({error: true})
    }
  }

  render() {
    const {error} = this.state
    let username = 'Draw yourself!'
    if (this.props.user.username) {
      username = `Draw ${this.props.user.username}!`
    }

    const errorMessage = error => {
      if (error) {
        return (
          <Error>Hold up! I'm not ready yet... Try again in a few seconds.</Error>
        )
      }
    }

    return (
      <FlexRow>
        <div>
          <Header text={username} />
          <Canvas ref="styledCanvas" width={450} height={450} />
          <Center>
            <StyledButton onClick={this.submit}>Submit</StyledButton>
          </Center>
          {errorMessage(error)}
        </div>
      </FlexRow>
    )
  }
}
