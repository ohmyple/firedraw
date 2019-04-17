
import React, { PureComponent } from 'react'
import styled                   from 'styled-components'
import posed                    from 'react-pose'


const Container = styled.div`
  padding-top: 65px;
`
const FormContainer = styled.div`
  height: 380px;
  width: 358px;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  text-align: center;
  left:0;
  right:0;
  margin:auto;
  max-width:100%;
  max-height:100%;
`
const FormInputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 44px;
  margin-top: 30px;
`
const Input = styled.input`
  height: 48px;
  width: 100%;
  box-sizing : border-box;
  margin-top: 33px;
  border: 1px solid #C4C4C4;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: lighter;
  font-size: 20px;
  padding-left: 10px;

  &:focus {
    outline: none !important;
    border:1px solid #EB5757;
  }
`
const Heading = styled.span`
  position: absolute;
  font-family: 'IBM Plex Sans';
  font-weight: lighter;
  font-size: 16px;
  color: #828282
  padding: 5px 0px 0px 0px;
  margin-top: 5px;
`
const Error = styled.h1`
  position: absolute;
  font-family: 'IBM Plex Sans';
  font-weight: 400;
  font-size: 16px;
  color: #828282
  top: 15px;
  text-align: center;
`
const InputContainer = styled.div`
  position: relative;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
`
const Button = posed.button({
  pressable: true,
  hoverable: true,
  init: {
    background: '#EB5757',
    scale: 1,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.25)',
  },
  hover: {
    background: '#f76d6d',
  },
  press: {
    scale: 0.96,
    boxShadow: '0px 0.1px 0.3px rgba(0, 0, 0, 0.25)',
  },
})
const StyledButton = styled(Button)`
  top: 400px;
  height: 59px;
  width: 90%;
  border: none;
  border-radius: 5px;
  padding: 0px;
  margin-top: 50px;
  margin-bottom: 20px;
  cursor: pointer;
  user-select: none;

  font-family: 'IBM Plex Sans';
  font-size: 24px;
  line-height: 59px;
  color: #F2F2F2
  text-align: center;
`

export default class NewGameForm extends PureComponent {
  render() {
    const {onchange, submit, dup} = this.props

    const error = (dup) => {
      if (dup) {
        return (
          <Error>
            This name is already taken, pick another!
          </Error>
        )
      }
    }

    return (
      <Container>
        <FormContainer>
          <FormInputContainer>
            {error(dup)}
            <InputContainer>
              <Heading>Game Name</Heading>
              <Input
                onChange={onchange}
                type='text'
                name='gamename'/>
            </InputContainer>
            <InputContainer>
              <Heading>Password</Heading>
              <Input
                onChange={onchange}
                type='text'
                name='password'
                autoComplete="off"/>
            </InputContainer>
            <StyledButton onClick={submit}>Submit</StyledButton>
          </FormInputContainer>
        </FormContainer>
      </Container>
    )
  }
}
