
import React, { PureComponent } from 'react'
import { Link }                 from 'react-router-dom'
import styled                   from 'styled-components'
import posed                    from 'react-pose'
import brandIcon                from '../assets/icons/brandIcon.svg'

const FormContainer = styled.div`
  position:absolute;
  height: 537px;
  width: 358px;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  text-align: center;
  top: 100px;

  left:0; right:0;
  margin:auto;
`
const FormInputContainer = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 44px;
  margin-bottom: 15px;
  top: 100px;
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
  font-style: 400;
  font-weight: lighter;
  font-size: 16px;
  color: #828282;
  padding: 5px 0px 0px 0px;
  margin-top: 5px;
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
const Submit = styled(Button)`
  position: absolute;
  top: 290px;
  height: 59px;
  width: 90%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;

  font-family: 'IBM Plex Sans';
  font-size: 24px;
  line-height: 59px;
  color: #F2F2F2
  text-align: center;
`
const BrandIcon = styled.svg`
  position: absolute;
  height: 76.19px;
  width: 73.42px;
  background-image: ${props => `url(${props.icon})`};
  background-size: contain;
  left: 0;
  top: 0;
  margin-top: 35px;
  margin-left: 150px;
`
const Span = styled.span`
  position: relative;
  font-family: 'IBM Plex Sans';
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
`
const CreateAccount = styled.div`
  position: relative;
`
const ForgotPass = styled.span`
  position: relative;
  top: 130px;
  font-family: 'IBM Plex Sans';
  font-size: 18px;
  font-weight: 300;
  color: #828282;
`
const CreateAccountContainer = styled.div`
  position: relative;
  margin-top: 110px;
`

export default class LoginForm extends PureComponent {
  render() {
    const { onchange, submit } = this.props
    return (
      <FormContainer>
        <BrandIcon icon={brandIcon} />
        <FormInputContainer>
          <InputContainer>
            <Heading>Username or Email</Heading>
            <Input
              onChange={onchange}
              type='username'
              name='username'/>
          </InputContainer>
          <InputContainer>
            <Heading>Password</Heading>
            <Input
              onChange={onchange}
              type='password'
              name='password'
              autoComplete="off"/>
          </InputContainer>
          <Submit onClick={submit}>
            Sign in
          </Submit>
        </FormInputContainer>
        <CreateAccountContainer>
          <CreateAccount>
            <Link to="/signup/">
              <Span>Create Your Account</Span>
            </Link>
          </CreateAccount>
          <ForgotPass>
            Forgot Password?
          </ForgotPass>
      </CreateAccountContainer>
      </FormContainer>
    )
  }
}
