import React, {useContext} from "react";
import { Redirect, Route } from 'react-router-dom'
import {AuthContext} from './libs/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const {isAuthorised, logout, email} = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthorised ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute