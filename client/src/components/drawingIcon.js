
import React, {PureComponent} from 'react'
import styled  from 'styled-components'
import newUser from '../assets/icons/newUser.svg'

const COLOR = props => {
  const {color} = props
  if (color === 0)
    return '#FFBF00'
  if (color === 1)
    return '#EB5757'
  if (color === 2)
    return '#2274A5'
}

const Background = styled.div`
  border-radius: 100%;
  background: ${COLOR};
`
const Avatar = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 100%;
  filter: opacity(75%);
  background-image: ${props =>
    props.photo ? `url(${props.photo})` : 'none'};
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

export default class DrawingIcon extends PureComponent {
  render() {
    const {photo, caption, color} = this.props
    return (
      <Container>
        <Background id='Background' color={color}>
          <Avatar photo={photo} />
        </Background>
        <Caption>{caption}</Caption>
      </Container>
    )
  }
}
