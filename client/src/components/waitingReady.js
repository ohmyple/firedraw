import React, {PureComponent} from 'react'
import styled                 from 'styled-components'
import posed                  from 'react-pose'

const Prompt = styled.div`
  padding-top: 9em;
`
const SubTitle = styled.h1`
  font-family: 'IBM Plex Sans';
  color: #333333;
  font-size: 48px;
  font-weight: 300;
  text-align: center;
  color: black;
  padding: 20px;
  margin: 0 auto;
  user-select: none;
`
const SubSubTitle = styled(SubTitle)`
  font-size: 24px;
  padding: 5px;
`

export default class WaitingReady extends PureComponent {
  render() {
    const {op} = this.props
    return (
      <Prompt>
        <SubSubTitle>Host: {op}</SubSubTitle>
        <SubTitle>{'Waiting on the Game Host'}</SubTitle>
      </Prompt>
    )
  }
}
