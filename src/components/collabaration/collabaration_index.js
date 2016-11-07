import React ,{Component } from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import { createAction } from 'redux-actions';
import SweetAlert from 'sweetalert-react';
import { CREATE_ROOM} from './types';
class Collabaration extends Component{

handleFormSubmit({ roomName,description,access,owner}){
			
			console.log({ roomName,description,access,owner});
			const createRoom = this.props.createRoom;
			const payload = { roomName,description,access,owner , Message:[] };
			createRoom(payload);
		}



	render(){
 const { handleSubmit,fields:{ roomName,description,access,owner} } = this.props;
				return(<div className={styles.collab_container}>
					<div className={styles.title}>Jcs Collabaration</div>
					<form className={styles.create_table_form} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
						<fieldset className="form-group">
							<lable className="form-label">Room Name</lable>
							<input type="text" className="form-control" {...roomName}/>
							{roomName.touched && roomName.error&& <div className="alert alert-danger">roomName Error</div>}
						</fieldset>
						<fieldset className="form-group">
							<lable className="formGroup">Description</lable>
							<input type="Text-Area" className="form-control" {...description} />
							{description.touched && description.error&& <div className="alert alert-danger">description Error</div>}
						</fieldset>
						<fieldset className="form-group">
							<lable className="formGroupExampleInput">Access</lable>
							<input type="text" className="form-control" {...access} />
							{access.touched && access.error&& <div className="alert alert-danger">access Error</div>}
						</fieldset>
						<fieldset className="form-group">
							<lable className="formGroupExampleInput">Owner</lable>
							<input type="text" className="form-control" {...owner}/>
							{owner.touched && owner.error&& <div className="alert alert-danger">tableHeader Error</div>}
						</fieldset>
						<button type="submit" className="btn btn-default">CreateTable</button>
					</form>
						</div>)
	}
}



function validate(formProps){
	const errors={};
	
	if(!formProps.roomName){
		errors.roomName="please enter an tableName";
	}
	if(!formProps.description){
		errors.description="please enter an tableName";
	}
	if(!formProps.access){
		errors.access="please enter an tableName";
	}
	if(!formProps.owner){
		errors.owner="please enter an tableName";
	}
	
	
	return errors;
	}

function mapDispatchToProps(dispatch) {
  return {
  	createRoom: (data)=>dispatch(createAction(CREATE_ROOM)(data) ),
    dispatch,
  }
}


function mapStateToProps(state){
  return { errorMessage : state.auth.error }
}


export default reduxForm({
  form:'collabaration',
  fields:['roomName','description','access','owner'],
  validate:validate
},mapStateToProps,mapDispatchToProps)(Collabaration);
