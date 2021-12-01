import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import useToken from '../hooks/useToken'


const PrivateRoute = ({ component: Component, ...rest }) => {

  const { token } = useToken()

  return (
    <Route
      {...rest}
      render={props =>
        token ? ( <Component {...props} /> ) : ( <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute