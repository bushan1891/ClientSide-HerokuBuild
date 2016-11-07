
import React, { PropTypes as T } from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import AuthService from '../../utils/AuthService'
import {connect }from 'react-redux';
import styles from './styles.css'
import { browserHistory } from 'react-router';
import {AUTH0_AUTHENTICATE} from './types';
import { createAction } from 'redux-actions';

export class Login extends React.Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  loginController(auth){
    auth.login();

  }

  render() {
    var options = {
  auth: {
    redirectUrl: 'jcsestimate.com'
  }
}; 
  	const auth = new AuthService("owZUf4N2FAMGaOVj76SEi1LV35HCWtKL", "jcstest.auth0.com",options);
    return (
      <div className={styles.root}>
        <h2>Welcome to JCS-Estimate App</h2>
        <ButtonToolbar className={styles.toolbar}>
          <Button bsStyle="primary" onClick={this.loginController.bind(this,auth)}>Login</Button>
        </ButtonToolbar>
      </div>
    )
  }
}
function mapStateToProps(state){
return {

  }
}
function mapDispatchToProps(dispatch){
return {
  dispatch,
}

}
export default connect (null , mapDispatchToProps)(Login);