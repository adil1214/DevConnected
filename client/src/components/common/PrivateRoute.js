import React from 'react'
import propTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';


const PrivateRoute = ({ auth, component: Component, ...rest }) => (
  <Route 
    {...rest}
    render = {props => 
      auth.isAuthenticated ? (
        <Component {...props}/>
      ) : (
        <Redirect to="/login"/>
      )
    }
  />
)

PrivateRoute.propTypes = {
  auth: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);
