
import React, { PureComponent } from 'react'
import { createGlobalStyle }    from 'styled-components'
import SignUpForm               from '../components/signUpForm.js'
import request                  from '../api'
import {Link, Redirect}         from 'react-router-dom'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F2F2F2;
    align-items: center;
    vertical-align: middle;
  }
`

export default class SignUpScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      isAuthenticated: false
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const body = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    }

    request({endpoint: '/api/user', body: JSON.stringify(body), headers:'application/json'})
      .then(res => res.json())
      .then(res => {
        if(res.userid) {
          this.setState({
            isAuthenticated: true
          })
        }
      })
      .catch(err => console.log(err))
    }

  render() {
    this.props.location.screen = "Sign Up"
    
    const { isAuthenticated } = this.state

    if(isAuthenticated) {
      return <Redirect to="/lobby" />
    }
    return (
      <div>
        <SignUpForm
          submit={this.onSubmit}
          onchange={this.handleChange}
        />
        <GlobalStyle/>
      </div>
    )
  }
}
