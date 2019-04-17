import React, {PureComponent} from 'react'
import styled from 'styled-components'

const StyledH1 = styled.h1`
  font-family: 'IBM Plex Sans';
  font-size: 36px;
  font-weight: 500;
  font-style: italic;
  text-align: center;
  color: #333333;
  padding: 12px;
  margin: 0 auto;
  user-select: none;
`

export default class Header extends PureComponent {
  render() {
    return <StyledH1>{this.props.text}</StyledH1>
  }
}
