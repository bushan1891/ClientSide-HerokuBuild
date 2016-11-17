import React ,{Component } from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import { createAction } from 'redux-actions';
import SweetAlert from 'sweetalert-react';
import {Link } from 'react-router';
import _ from 'lodash';
import Dropdown from 'react-dropdown'

import { CREATE_ACCOUNT , FETCH_ACCOUNT , UPDATE_ACCOUNT , DELETE_ACCOUNT , FETCH_TEMPLATES} from '../types';
import { CREATEWBS } from '../../Cart/types';
class ManageAccount extends Component {
	
	constructor(props){
		super(props);
		this.state={
			sow:{}
		};
	}
	
	selectSOW(){
		console.log(this.state);
	}
	_onSelect(obj){
	console.log(obj);

	// get the account
	const id = this.props.params.id;
		const accounts = this.props.account;
		let Currentaccount ;
		accounts.forEach(function(account){
			if(id==account._id){
				Currentaccount = account;
			}	
		});	
	// get the template 
	let template;
	const templates = this.props.templates;
	templates.forEach(function(temp){
		if(temp._id==obj.value){
			template= temp;
		}
	});

	console.log('template selected is ' , template);





	// handle update
	const props = this.props;
	swal({
    title: `Add ${obj.label} ?`,
    text: ``,
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#27ae60",
    confirmButtonText: "Yes, Add it!",
    cancelButtonText: "No, cancel plx!",
    closeOnConfirm: false,
    closeOnCancel: false
}, function(isConfirm) {
    if (isConfirm) {
        swal("Added to Current Account ", "SOW Assigned ", "success");

		// make a call here to update the account 
		Currentaccount.sow.push(template);
		props.updateAccount(Currentaccount);

    } else {
        swal("Cancelled", "Did not Update SOW", "error");
    }
});

	}

	handleDelete(obj){
	
	const id = this.props.params.id;
	const updateAccount = this.props.updateAccount;
		const accounts = this.props.account;
		let Currentaccount ;
		accounts.forEach(function(account){
			if(id==account._id){
				Currentaccount = account;
			}	
		});		
		
console.log('before ' , Currentaccount);
		// send a swal confirmation 		
		swal({
		    title: `Remove ${obj.templateName} ?`,
		    text: ``,
		    type: "warning",
		    showCancelButton: true,
		    confirmButtonColor: "#c0392b",
		    confirmButtonText: "Yes,Remove Sow",
		    cancelButtonText: "No, cancel plx!",
		    closeOnConfirm: false,
		    closeOnCancel: false
			}, function(isConfirm) {
			    if (isConfirm) {
			        swal("Removed !", "", "success");
					
				// if yes delete , remove from account and triggre an update 
					Currentaccount.sow = _.remove(Currentaccount.sow, function(n) {
						  return n._id != obj._id;
						});
					updateAccount(Currentaccount);
				
					console.log('after ' , Currentaccount);

			    } else {
			        swal("Cancelled", "Did not remove Sow", "error");
			    }
			});


		


	}

	handleGenerateWBS(obj){
		console.log(obj);
			let allTable= _.concat(obj.cart,obj.otherItem);
		   // use the generate wbs
			const payload ={
				cart_name:obj.templateName,
				data: allTable
			}

			const createWBS = this.props.createWBS;
			createWBS(payload);

	}

	handleGenerateSOW(obj){
		alert(JSON.stringify(obj));
		
		// use generate sow 

	}

	componentWillMount(){
	// load templates here 
	const fetchTemplate = this.props.fetchTemplate;
	fetchTemplate();
	}

	handleList(obj){
	const fetchTemplate =this.props.fetchTemplate;
	let boundDelete = this.handleDelete.bind(this, obj);
	let boundSow = this.handleGenerateSOW.bind(this, obj);
	let boundWbs = this.handleGenerateWBS.bind(this, obj);

		return (
			<li className={styles.sow_list}>
		<div className={styles.pointer_cursor}>
			{obj.templateName} | 
			<a className={styles.button} onClick={boundSow}>
				<i className="fa fa-file-word-o fa-fw"></i>
	        Generate SOW  
			</a>
								|
			<a className={styles.button} onClick={boundWbs}>
				<i className="fa fa-file-text fa-fw"></i>
	        Generate WBS
			</a>
								|

			<a className={styles.button} onClick={boundDelete}>
				<i className="fa fa-trash"></i>
	        Delete
			</a>
        </div>

        </li>
		)
	}
	
	renderDropdown(){
	let options = [];
	const templates = this.props.templates;
	
	templates.forEach(function(obj){
		options.push({value:obj._id,label:obj.templateName});
	})

	const defaultOption = options[0]

		return (
				<div className={styles.Dropdown}>
				<Dropdown options={options} onChange={this._onSelect.bind(this)} value={defaultOption} placeholder="Select an option" />
				</div>

			)
	}

	renderSOW(){
		const id = this.props.params.id;
		const accounts = this.props.account;
		let Currentaccount ;
		accounts.forEach(function(account){
			if(id==account._id){
				Currentaccount = account;
			}	
		});		
		
		if(Currentaccount.sow.length==0){
			return (
			<div className={styles.sow}>No Sow Assigned</div>
			)
		}
		else if ( Currentaccount.sow.length >0)  {
			return (
				<div className={styles.sow}>
						{Currentaccount.sow.map(this.handleList.bind(this))}
				</div>
			)
		}
		
	}


	render(){
		const id = this.props.params.id;
		const accounts = this.props.account;
		let Currentaccount ;
		accounts.forEach(function(account){
			if(id==account._id){
				Currentaccount = account;
			}	
		});		


		return(
				<div className={styles.manage_container}>
					<div className={styles.title}>Manage Account</div>
						<div className={styles.detail_container}>
						<div className={styles.item}><strong className={styles.lable}>Account Name:</strong>{_.toUpper(Currentaccount.accountName)}</div>
						<div className={styles.item}><strong className={styles.lable}>Account Author:</strong>{_.toUpper(Currentaccount.author)}</div>
						<div className={styles.item}><strong className={styles.lable}>Account Created:</strong>{_.toUpper(Currentaccount.created)}</div>
						<div className={styles.item}><strong className={styles.lable}>Account SOW: </strong> {this.renderSOW()}</div>
						
						<div className={styles.item}><strong className={styles.lable}>Available Templates</strong>{this.renderDropdown()}</div>
					
					</div>
				</div>
			)
	}
}

function mapDispatchToProps(dispatch){
	return{
		fetchTemplate: ()=>dispatch(createAction(FETCH_TEMPLATES)()),
		updateAccount: (data)=>dispatch(createAction(UPDATE_ACCOUNT)(data)),
		createWBS : (data) => dispatch(createAction(CREATEWBS)(data)),
		dispatch,
	}
}

function mapStateToProps(state){
	return{ 
		account : state.account,
		templates:state.templates
		}
}

export default connect(mapStateToProps,mapDispatchToProps)(ManageAccount);