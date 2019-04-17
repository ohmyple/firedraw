
import React, { Component }   from 'react'
import styled                 from 'styled-components'
import FriendMessage          from '../components/friendMessage.js'
import UserMessage            from '../components/userMessage.js'
import { withRouter}          from 'react-router'
import request                from '../api'

const Container = styled.div`
  position: fixed;
  display: flex;
  right: 0px;
  width: 350px;
  background-color: #F2F2F2;
  height: 100%;
`
const FlexChatContainer = styled.div`
  padding-top: 80px;
  padding-left: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 90px;
  border-left: 1px solid #D5D5D5;
`
const FormInput = styled.form`

`
const ChatInput = styled.input`
  position: absolute;
  height: 46px;
  left: 0;
  bottom: 0;
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: lighter;
  font-size: 14px;
  padding-left: 10px;
`

class ChatContainer extends Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
    this.message = React.createRef()
    this.state = {
      chat: [],
      update: false,
      currentUser: '',
      //roomId will be done on a screen level
      roomId: 'lobby'
    }
  }

  componentDidMount() {
    fetch('/api/redirect')
    .then(res => res.json())
    .then(user => {
      this.setState({
        currentUser: user.username
      })
    })
    this.initSocket()
  }

  initSocket = () => {
	  const { socket } = this.props
    const { roomId } = this.state

    socket.on(`newMessage-${roomId}`, (chat) => {
      this.setState({
        chat: [...this.state.chat, chat]
      })

      const options = {behavior: "smooth"}
      this.message.current.scrollIntoView(options)
    })
	}

  sendMessage = newMessage => {
    const { roomId } = this.state
    const message = JSON.stringify(newMessage)

    request({endpoint: `/api/chat/${roomId}`, body: message, headers: 'application/json'})
  }

  onEnterPress = e => {
    const message = this.textInput.current.value

    if(message.length >= 1) {
      if(e.key === 'Enter') {
        e.preventDefault()
        e.stopPropagation()
        this.sendMessage({message})
        this.textInput.current.value = ''
      }
    }
  }

  render() {
    const { chat, currentUser } = this.state

    const chatRoom = chat.map((data, index) => {
      const { username, message, time, profilephoto } = data

      if(currentUser === username) {
        return (
          <UserMessage
          ref={this.message}
          key={index.toString()}
          message={message}
          username={username}
          time={time}
          profilephoto={profilephoto}
        / >
        )}
        else {
        return (
          <FriendMessage
          ref={this.message}
          key={index.toString()}
          message={message}
          username={username}
          time={time}
          profilephoto={profilephoto}
          />
        )}
      })

    return (
      <Container>
        <FlexChatContainer>
          {chatRoom}
        </FlexChatContainer>
        <FormInput>
          <ChatInput
            type="text"
            ref={this.textInput}
            onKeyPress={this.onEnterPress}
            placeholder="Type a message"
          />
        </FormInput>
      </Container>
    )
  }
}

export default withRouter(ChatContainer)
