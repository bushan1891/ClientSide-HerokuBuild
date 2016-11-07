import React ,{Component } from 'react';
import styles from './styles.css';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import { createAction } from 'redux-actions';
import SweetAlert from 'sweetalert-react';
import {Link } from 'react-router';
import _ from 'lodash';
import { CREATE_ACCOUNT , FETCH_ACCOUNT , UPDATE_ACCOUNT , DELETE_ACCOUNT } from './types';
import { browserHistory } from 'react-router';
class ViewAccount extends Component {
componentWillMount(){
	// get all the account
  if(this.props.account.length==0){
    this.props.fetchAccount();
  }
  
}
	render(){
    console.log('view account',this.props.account);
		if(this.props.account.length>0){
	     const accounts = this.props.account;
       return(<div className="">
          <div className={styles.title}>View Account</div>
          <div className={styles.flex_container}>
              {accounts.map((obj)=>(<ListItemWrapper key={obj._id} data={obj}>
                                    </ListItemWrapper>))}
       </div>
        </div>)
		}
		else{
			return(
			<div className={styles.table_view_container}>
					Loading...
				</div>
			)

		}
	}
}

class ListItemWrapper extends React.Component {
  manageAccount(){
  browserHistory.push('/account/'+this.props.data._id);
}

  render() {
    return (<div className={styles.flex_item1}  onClick={this.manageAccount.bind(this)}>
    			      <h1 className={styles.card_heading}>Account Name : {this.props.data.accountName}</h1>
                <h1 className={styles.card_subtext}>Author : {this.props.data.author}</h1>
                <h1 className={styles.card_subtext}>Current SOW : {this.props.data.sow.length}</h1>
                <h1 className={styles.card_subtext}>Created On : {this.props.data.created}</h1>     

               <button className="btn btn-default">Add</button>     
    		</div>);
  }
}
function mapDispatchToProps(dispatch) {
  return {
  	fetchAccount: ()=>dispatch(createAction(FETCH_ACCOUNT)() ),
    dispatch,
  }
}


function mapStateToProps(state){

  return { account : state.account}
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewAccount);