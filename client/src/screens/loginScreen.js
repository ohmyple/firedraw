
import React, { Component }  from 'react'
import { createGlobalStyle } from 'styled-components'
import LoginForm             from '../components/loginForm.js'
import request               from '../api'
import {Link, Redirect}      from 'react-router-dom'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F2F2F2;
    align-items: center;
    vertical-align: middle;
  }
`

export default class LoginScreen extends Component {
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
  componentDidMount() {
    this.props.location.screen = "Firedraw"
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

    request({endpoint: '/api/login', body: JSON.stringify(body), headers:'application/json'})
      .then(res => res.json())
      //link should go here if succesful
      .then(res => {
        if(res.isAuthenticated) {
          this.setState({
            isAuthenticated: true
          })
        }
      })
      .catch(err => new Error(err))
  }

  render() {
    // this.props.location.screen = "Firedraw!"

    let { from } = this.props.location.state || { from: { pathname: "/" } };

    const { isAuthenticated } = this.state

    if(isAuthenticated) {
      return  (
        <Redirect to="/lobby" />
      )
    }

    return (
      <div>
        <LoginForm
          submit={this.onSubmit}
          onchange={this.handleChange}
        />
        <GlobalStyle/>
      </div>
    )
  }
}
