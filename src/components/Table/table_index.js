import React ,{Component } from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import SideBar from './sidebar/sidebar';
import {createAction} from 'redux-actions';
import {Link }from 'react-router';

class Table extends Component {


renderInstruction(){
	if(!this.props.children){

	return (
		<div className={styles.instructionContainer}>
			<h1 className={styles.title}>Instruction</h1>

				<ul className={styles.bodyContainer}>
					<li className={styles.detail}>
					<div className={styles.title}>Follow Instructions to Create Customer and Assign SOW </div>
					<div className={styles.details}><p>
						<span className={styles.step}>STEP 1 : </span> Create a new customer ->  <Link className={styles.link} to="/account">Click here</Link><br/>
						<span className={styles.step}>STEP 2 : </span> View all Customers ->  <Link className={styles.link} to="/view_account">Click here</Link><br/>
						<span className={styles.step}>STEP 3 : </span> Select Services From list of available modules <Link className={styles.link} to="/table/view">Click here</Link><br/> 	
						<span className={styles.step}>STEP 4 : </span> Once your done Selecting appropriate Modules click SAVE this adds the module to Selections <br/>
						<span className={styles.step}>STEP 5 : </span> To view your selections -><Link className={styles.link} to="/cart">Click here</Link> <br/>
						<span className={styles.step}>STEP 6 : </span> Click Save as template (Saves the selections as template which can be assigned to a customer) <br/>
						<span className={styles.step}>STEP 7 : </span> View all your saved Templates -><Link className={styles.link} to="/view_template">Click here</Link><br/>
						<span className={styles.step}>STEP 8 : </span> Identify your Customer and clcik on Manage Customer - > <Link className={styles.link} to="/view_account">Click here</Link><br/>
						<span className={styles.step}>STEP 9 : </span> You will be able to assign SOW to your account from here.
					</p></div>
					</li>
					<li className={styles.detail}>

						 	<div className={styles.title}>
						For Detailed steps please go to link / watch the viedo below
						<a href="https://jcsconsulting.jiveon.com/docs/DOC-17276"><div className={styles.link}>JCSEstimate</div></a>
				</div>	
					</li>
				</ul>
				<div className={styles.iframe}> 		
					<iframe src="https://jcsconsultingdemo.box.com/s/d23qrds410evx3n4sykcykweuy7aa1f4" width="1040" height="550" frameborder="0" allowfullscreen webkitallowfullscreen msallowfullscreen></iframe>
				</div>			
	
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
