import React, {PureComponent} from 'react'
import styled from 'styled-components'

const NavTitle = styled.h1`
  position: relative;
  font-family: 'IBM Plex Sans';
  font-weight: normal;
  font-size: 36px;
  line-height: 45px;
  margin: auto;
  padding-left: 65px;
  color: #f2f2f2;
  width: auto;
  z-index: 289;
`

export default class Title extends PureComponent {
  render() {
    document.title = this.props.screen
    return <NavTitle>{this.props.screen}</NavTitle>
  }
}
