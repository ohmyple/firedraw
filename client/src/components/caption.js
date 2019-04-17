import React, {PureComponent} from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  width: 300px;
  height: 55px;
  padding-left: 50px;
  padding-right: 50px;
  background: #ffffff;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;

  font-family: 'IBM Plex Sans';
  font-size: 24px;
  font-weight: 500;
  font-style: italic;
  text-align: center;
  color: #333333;
  margin: 0 auto;
`

export default class Caption extends PureComponent {
  render() {
    const {onchange} = this.props
    return <StyledInput
      onChange={onchange}
      type='text'
      name='answer'/>
  }
}
