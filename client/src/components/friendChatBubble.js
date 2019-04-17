import React, {PureComponent} from 'react'
import styled from 'styled-components'

const Bubble = styled.div`
  min-height: 40px;
  max-width: 208px;
  border-radius: 5px;
  background-color: #FFFFFF;
  margin-right: 20px;
  border-style: solid;
  border-width: 1px;
  border-color: #E0E0E0;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 5px;
`

const Message = styled.span`
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: lighter;
  font-size: 12px;
  word-wrap: break-word;
  color: #4F4F4F;
    ::selection {
    background: #fd5068;
    color: #fff;
  }
`

export default class FriendChatBubble extends PureComponent {
  render() {
    const {message} = this.props

    return (
      <Bubble message={this.props.message}>
        <Message>
          {message}
        </Message>
      </Bubble>
    )
  }
}
