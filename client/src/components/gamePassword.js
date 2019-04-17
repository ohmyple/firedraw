import React, {PureComponent} from 'react'
import styled                 from 'styled-components'
import posed                  from 'react-pose'

const FlexRow = styled.section`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
`
const Font = styled.p`
  font-family: 'IBM Plex Sans';
  font-weight: 400;
`
const Heading = styled(Font)`
  position: absolute;
  font-style: 400;
  font-size: 14px;
  color: #828282
  padding: 5px 0px 0px 0px;
  margin-top: 5px;
`
const H1 = styled(Font)`
  font-size: 12px;
  text-align: center;
  padding: 12px;
  margin: 0 auto;
`
const Input = styled.input`
  height: 38px;
  width: 100%;
  box-sizing : border-box;
  margin-top: 33px;
  border: 1px solid #C4C4C4;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: lighter;
  font-size: 16px;
  padding-left: 10px;

  &:focus {
    outline: none !important;
    border:1px solid #EB5757;
  }
`
const InputContainer = styled.div`
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
`
const Button = posed.div({
  pressable: true,
  hoverable: true,
  init: {
    background: '#EB5757',
    scale: 1,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
  },
  hover: {
    background: '#f76d6d',
  },
  press: {
    scale: 0.98,
    boxShadow: '0px 0.5px 1px rgba(0, 0, 0, 0.25)',
  },
})
const StyledButton = styled(Button)`
  width: 123px;
  height: 42px;
  border-radius: 15px;
  color: #f2f2f2;
  margin-top: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  user-select: none;
`

export default class GamePassword extends PureComponent {
  render() {
    const {onchange, submit, back} = this.props
    return (
      <div>
        <InputContainer>
          <Heading>Enter Password</Heading>
          <Input
            onChange={onchange}
            type='text'
            name='password'
            autoComplete="off"/>
        </InputContainer>
        <FlexRow>
          <StyledButton onClick={back}>
            <H1>Back</H1>
          </StyledButton>
          <StyledButton onClick={submit}>
            <H1>Join</H1>
          </StyledButton>
        </FlexRow>
      </div>
    )
  }
}
