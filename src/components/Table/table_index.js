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

			<div className={styles.iframe}>
				<iframe src="https://jcsconsultingdemo.app.box.com/embed/s/jmlb96y0euypgrzze5cxxz29b4twyjcd" width="1000" height="550" frameborder="0" allowfullscreen webkitallowfullscreen msallowfullscreen></iframe>
				
			</div>


				<ul className={styles.bodyContainer}>
					<li className={styles.detail}>
					<div className={styles.title}>Step 1 : Create Customer</div>
					<div className={styles.details}><p>
						Create a new customer ?<br/>
						   ->  Click  <Link className={styles.link} to="/account">here</Link><br/>
						View all Customers ?<br/>
						   ->  Click  <Link className={styles.link} to="/view_account">here</Link>
					</p></div>


					</li>
					<li className={styles.detail}>
						<div className={styles.title}>Step 2 : Create WBS template OR select from available list of WBS 
						</div>
						<div className={styles.details}><p>
						Create a new WBS template ?<br/>
						   ->  Click  <Link className={styles.link} to="/table/create">here</Link><br/>
						View all WBS templates?<br/>
						   ->  Click  <Link className={styles.link} to="/table/view">here</Link>
					</p></div>
					</li>
					<li className={styles.detail}><div className={styles.title}>Step 3 : Review you'r Selections </div> 
					<div className={styles.details}><p>
						Once you add appropriate modules to your selection you will be able to save it as template 
					    or Genrate SOW  <br/>
					     Click  <Link className={styles.link} to="/cart">here</Link>
					    </p></div>
					</li>
					<li className={styles.detail}><div className={styles.title}>Step 4 : View And Manage your account</div>
						<div className={styles.details}><p>
						Click  <Link className={styles.link} to="/cart">here</Link> to navigate to Manage account 
						 </p></div>
					</li>
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
