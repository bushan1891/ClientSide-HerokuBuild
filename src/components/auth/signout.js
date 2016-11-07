import React , {Component} from 'react';
import {connect } from 'react-redux';
import styles from './styles.css';
import * as actions from '../../actions';
import {AUTH0_AUTHENTICATE_LOGOUT} from './types';
import { createAction } from 'redux-actions';
class Signout extends Component {
componentWillMount() {
  //this.props.signoutUser();
 
}
render(){
	 this.props.auth0_logout();
  return <div>Bye Bye  </div>;
}
}

function mapDispatchToProps(dispatch){
return{
	auth0_logout:()=>dispatch(createAction(AUTH0_AUTHENTICATE_LOGOUT)()),
	dispatch,
}
}

export default connect(null,mapDispatchToProps)(Signout);
