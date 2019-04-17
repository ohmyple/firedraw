import React from 'react'
import ReactDOM from 'react-dom'
import UserProfilePhoto from './components/userProfilePhoto.js'

it('renders UserProfilePhoto without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<UserProfilePhoto />, div)
  ReactDOM.unmountComponentAtNode(div)
})
