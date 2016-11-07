import React ,{Component } from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import SideBar from './sidebar/sidebar';
import {createAction} from 'redux-actions';

class Table extends Component {
	render(){
		console.log('called at index table');
		this.props.auth0_authenticate();
		return (
			<div className={styles.tableview}>
				<div className="row">
					<div className="col-md-3 left_sidebar">
						<SideBar />
					</div>	
					<div className="col-md-9 right_sidebar">
						{this.props.children}	
					</div>
				</div>
			</div>
			)
	}
}

function mapStateToProps(state){
	return {errorMessage : state.auth.error}
}

function mapDispatchToProps(dispatch){
return {
  auth0_authenticate: ()=>dispatch(createAction('AUTH0_AUTHENTICATE')()),
  dispatch,
}
}
export default connect (mapStateToProps,mapDispatchToProps)(Table);
