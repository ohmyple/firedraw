
import React from 'react'
import {
  BrowserRouter as
  Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'


const ProtectedRoute = ({ component: Component, ...rest }) => {

  const isTrue = {
    isAuth: true
  }
  
  return (
    <Route
      {...rest}
      render={props =>
        isTrue.isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute
