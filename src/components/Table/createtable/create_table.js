import React ,{Component } from 'react';
import styles from '../styles.css';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import { createAction } from 'redux-actions';
import SweetAlert from 'sweetalert-react';
import { POST_TABLE , POST_TABLE_SUCCESSFUL , FETCH_TABLES} from '../types';

class CreateTable extends Component{
	handleFormSubmit({ tableName,tableColumnCount,tableRowCount,tableHeader}){
			
			const headerCount =tableHeader.split(",");
			tableColumnCount=headerCount.length; 

			const table	={
				  tableName:tableName,
				  tableHeader:tableHeader,
				  tableRowCount:tableRowCount,
				  tableColumnCount:tableColumnCount 
			}		
			const postTable = this.props.postTable;
			postTable(table);
			swal("Good job!", "You submited the table!", "success");
		}

	render(){
		
	    const { handleSubmit,fields:{ tableName,tableColumnCount,tableRowCount,tableHeader} } = this.props;
		return (
			<div className={styles.create_table_form_container}>
				<div className={styles.table_title}>Create Table</div>
				<form className={styles.create_table_form} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<lable className="form-label">TableName</lable>
					<input type="text" className="form-control" {...tableName}/>
					{tableName.touched && tableName.error&& <div className="alert alert-danger">TableName Error</div>}
				</fieldset>
				<fieldset className="form-group">
					<lable className="formGroup">Number of Header</lable>
					<input type="Number" className="form-control" {...tableColumnCount} />
					{tableColumnCount.touched && tableColumnCount.error&& <div className="alert alert-danger">tableColumnCount Error</div>}
				</fieldset>
				<fieldset className="form-group">
					<lable className="formGroupExampleInput">Number of Rows</lable>
					<input type="Number" className="form-control" {...tableRowCount} />
					{tableRowCount.touched && tableRowCount.error&& <div className="alert alert-danger">tableRowCount Error</div>}
				</fieldset>
				<fieldset className="form-group">
					<lable className="formGroupExampleInput">Header Array</lable>
					<input type="text" className="form-control" {...tableHeader}/>
					{tableHeader.touched && tableHeader.error&& <div className="alert alert-danger">tableHeader Error</div>}
				</fieldset>
				<button type="submit" className="btn btn-default">CreateTable</button>
			</form>
			</div>
			
			)
	}
}

function validate(formProps){
	const errors={};
	
	if(!formProps.tableName){
		errors.tableName="please enter an tableName";
	}
	if(!formProps.tableColumnCount){
		errors.tableColumnCount="please enter an tableName";
	}
	if(!formProps.tableRowCount){
		errors.tableRowCount="please enter an tableName";
	}
	if(!formProps.tableHeader){
		errors.tableHeader="please enter an tableName";
	}
	
	
	return errors;
	}

function mapDispatchToProps(dispatch) {
  return {
  	postTable: (data)=>dispatch(createAction(POST_TABLE)({...data}) ),
    dispatch,
  }
}


function mapStateToProps(state){
  return { errorMessage : state.auth.error }
}


export default reduxForm({
  form:'createTable',
  fields:['tableName','tableColumnCount','tableRowCount','tableHeader'],
  validate:validate
},mapStateToProps,mapDispatchToProps)(CreateTable);