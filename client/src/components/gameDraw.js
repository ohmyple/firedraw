import React, {PureComponent} from 'react'
import styled                 from 'styled-components'
import {uploadImage}            from '../api/images'
import Canvas                 from './canvas.js'
import Timer                  from './timer.js'
import Header                 from './header.js'

const FlexRow = styled.section`
  padding-top: 100px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`
const Error = styled.h1`
  font-family: 'IBM Plex Sans';
  font-weight: 400;
  font-size: 16px;
  color: #828282
  text-align: center;
`

export default class GameRoom extends PureComponent {
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

  componentDidUpdate() {
    const {progress, submit} = this.props
    if (submit) {
      this.submit()
    }
    if (progress === -1) {
      this.submit()
    }
  }

  render() {
    const {error} = this.state
    const {caption, progress} = this.props

    const errorMessage = error => {
      if (error) {
        return (
          <Error>Hold up! I'm not ready yet... Try again in a few seconds.</Error>
        )
      }
    }

    return (
      <div>
        <FlexRow>
          <div>
            <Header text={caption} />
            <Canvas ref="styledCanvas" width={450} height={450} />
          </div>
        </FlexRow>
        <Timer value={progress} />
        {errorMessage(error)}
      </div>
    )
  }
}
