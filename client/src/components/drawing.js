import React, {PureComponent} from 'react'
import styled from 'styled-components'

/***************************************************************
We shouldn't import the newUser icon when someone hasn't joined.
Should either be blank and populated when a new user joins or
some lighter colored version of the icon
*****************************************************************/

/****************************************************************/
import newUser from '../assets/icons/newUser.svg'
/****************************************************************/

const Avatar = styled.div`
  height: 350px;
  width: 350px;
  border-radius: 30px;
  background-image: ${props =>
    props.photo ? `url(${props.photo})` : `none`};
  background-size: contain;
`
const Caption = styled.div`
  font-family: 'IBM Plex Sans';
  font-weight: 300;
  font-size: 12px;
  text-align: center;
  color: #000000;
`
const Container = styled.div`
  margin-bottom: 60px;
  margin-top: 45px;
  padding-left: 30px;
  padding-right: 40px;
`

export default class Drawing extends PureComponent {
  render() {
    return (
      <Container>
        <Avatar photo={this.props.photo} />
        <Caption>{this.props.caption}</Caption>
      </Container>
    )
  }
}

/********************************************************************************
This component takes in a photo and a caption as a prop.
If no photo is passed a default blank avatar is passed.
*********************************************************************************/
