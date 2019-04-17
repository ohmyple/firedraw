import React, {Component} from 'react'
import styled from 'styled-components'

import newUser from '../assets/icons/newUser.svg'

const Avatar = styled.div`
  position: relative;
  right: 0;
  height: 45px;
  width: 45px;
  border-radius: 30px;
  background-image: ${props =>
    props.profilephoto ? `url(${props.profilephoto})` : `url(${newUser})`};
  background-size: contain;
  margin-right: 15px;
`

export default class UserProfilePhoto extends Component {

  render() {
    const { profilephoto, children } = this.props
    return (
      <Avatar profilephoto={profilephoto}>
        {children}
      </Avatar>
    )
  }
}
