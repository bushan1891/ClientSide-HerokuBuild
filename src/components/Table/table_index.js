import React ,{Component } from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import SideBar from './sidebar/sidebar';
import {createAction} from 'redux-actions';

class Table extends Component {


renderInstruction(){
	if(!this.props.children){

	return (
		<div className={styles.instructionContainer}>
			<h1 className={styles.title}>Instruction</h1>
				<ul className={styles.bodyContainer}>
					<li className={styles.detail}>Create Customer</li>
					<li className={styles.detail}>Create WBS template OR select from available list of WBS</li>
					<li className={styles.detail}>Review you'r Selections </li>
					<li className={styles.detail}>Save your selection as template</li>
					<li className={styles.detail}>Assign your template to a customer</li>
					<li className={styles.detail}>Generate Your WBS</li>
				</ul>			
	
		</div>
		)	
	}
	else{
		return (
			<div></div>
		)
	}
}


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
							{this.renderInstruction()}	
							{this.props.children}
							<div className={styles.emptyspace}>

							</div>	
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
