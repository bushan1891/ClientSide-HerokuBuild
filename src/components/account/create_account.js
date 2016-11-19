import React ,{Component } from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import { createAction } from 'redux-actions';
import SweetAlert from 'sweetalert-react';
import { CREATE_ACCOUNT , FETCH_ACCOUNT , UPDATE_ACCOUNT , DELETE_ACCOUNT } from './types';


class CreateAccount extends Component{
	handleFormSubmit({ accountName,author}){
			
			// create a saga
			this.props.createAccount({ accountName,author});
			swal("Good job!", "You submited the table!", "success");
		}


	render(){
		const { handleSubmit,fields:{ accountName,author} } = this.props;
		return (	<div className={styles.createAccount_container}>
						<div className={styles.title}>Create Account</div>
					<form  className={styles.create_account_form} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
						<fieldset className="form-group">
						<lable className="form-label">Customer Name</lable>
						<input type="text" className="form-control" {...accountName}/>
						{accountName.touched && accountName.error&& <div className="alert alert-danger">AccountName Error</div>}
						</fieldset>
						<fieldset className="form-group">
						<lable className="form-label">Owner</lable>
						<input type="text" className="form-control" {...author}/>
						{author.touched && author.error&& <div className="alert alert-danger">Author Error</div>}
						</fieldset>
						<button type="Submit" className="btn btn-default button">CreateAccount</button>
					</form>
			</div>
			)
	}
}

function validate(formProps){
	const errors={};
	if(!formProps.accountName){
		errors.accountName="please enter an accountName";
	}
	
	if(!formProps.author){
		errors.author="please enter an accountName";
	}

	return errors;
	}

function mapDispatchToProps(dispatch) {
  return {
  	createAccount : (data) =>{dispatch(createAction(CREATE_ACCOUNT)(data)) },
    dispatch,
  }
}

function mapStateToProps(state){
  return {  }
}

export default reduxForm({
  form:'account',
  fields:['accountName','author'],
  validate:validate
},mapStateToProps,mapDispatchToProps)(CreateAccount);