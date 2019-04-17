
import React, { Component }   from 'react'
import styled                 from 'styled-components'
import UserProfilePhoto       from '../components/userProfilePhoto'
import NavTitle               from '../components/title.js'
import brandIcon              from '../assets/icons/brandIcon.svg'
import { withRouter}          from 'react-router'
import request                from '../api'

const Header = styled.nav`
  position: fixed;
  height: 45px;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #eb5757;
  display: flex;
  flex-direction: row;
  text-align: center;
  z-index: 299;
`

const BrandIcon = styled.svg`
  position: absolute;
  height: 56.19px;
  width: 53.42px;
  background-image: ${props => `url(${props.icon})`};
  background-size: contain;
  left: 0;
  top: 0;
  bottom: 10;
  margin-left: 20px;
`

class NavBar extends Component {

  constructor() {
    super()
    this.state = {
      location: '',
      title: '',
      file: '',
      photo: '',
      hashFile: false
    }
  }

  componentDidMount() {
    fetch('/api/user')
    .then(res => res.json())
    .then(user => {
      this.setState({
        photo: user.profilephoto
      })
    })
    .catch(err => new Error(err))
  }

  getLocation = () => {
    setTimeout(() => {
      this.setState({
        location: this.props.location.screen
      })
    }, 0)
  }

  changePhoto = e => {
    this.setState({
      file: e.target.files[0],
      hasFile: true
    }, () => {
      this.setProfilePhoto()
    })
  }

  setProfilePhoto = () => {
    const data = new FormData()
    data.append('avatar', this.state.file)

    request({endpoint: '/api/user', body: data, method: 'PUT'})
    .then(res => res.json())
    .then(user => {
      this.setState({
        photo: user.photo
      })
    })
  }

  render() {
    //this is actually bad
    // this.getLocation()

    const { photo } = this.state
    const { screen } = this.props
    const title = this.props.location.screen

    return (
      <Header>
        <BrandIcon icon={brandIcon} />
        <NavTitle screen={title} />
        <div onChange={this.changePhoto}>
          <UserProfilePhoto profilephoto={photo}>
            <input ref="photo" type="file" style={{height: "100%", opacity: 0}}/>
          </UserProfilePhoto>
        </div>
      </Header>
    )
  }
}

export default withRouter(NavBar)
