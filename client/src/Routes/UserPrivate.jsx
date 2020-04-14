import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import Auth from '../modules/Auth'

const UserPrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      Auth.isUserAuthenticated() ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )

export {UserPrivateRoute};
