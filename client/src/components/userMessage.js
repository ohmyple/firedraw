
import React                  from 'react'
import styled                 from 'styled-components'
import UserChatBubble         from './userChatBubble.js'
import UserProfilePhoto       from './userProfilePhoto.js'
import NavBar                 from '../containers/navBar.js'

//Remove this later
const me = require('../assets/photos/me.jpg');

const Container = styled.div`
  position: relative;
  margin-top: 5px;
  margin-left: 20px;
  padding-bottom: 5px;
  margin-right: 5px;
`

const FlexContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
`

const TimeContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 5px 20px 5px 0px;
`

const UserName = styled.span`
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: lighter;
  font-size: 11px;
  color: #828282;
    ::selection {
    background: #fd5068;
    color: #fff;
  }
`

const UserMessage = React.forwardRef(({
  message,
  profilephoto,
  username,
  time
}, ref) => (
  <Container ref={ref}>
    <FlexContainer>
      <UserProfilePhoto profilephoto={profilephoto} />
      <UserChatBubble message={message} />
      </FlexContainer>
      <TimeContainer>
        <UserName>{username}:- {time}</UserName>
      </TimeContainer>
  </Container>
))

export default UserMessage
