import React ,{Component } from 'react';
import {Link} from 'react-router';
import styles from '../styles.css';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import { createAction } from 'redux-actions';
import { POST_TABLE , POST_TABLE_SUCCESSFUL , FETCH_TABLES} from '../types';
import DisplayList from './displaylist';
import { browserHistory } from 'react-router';

class ViewTable extends Component {

componentWillMount(){
	// get all the tables
	const fetchTable = this.props.fetchTable;
	fetchTable(); 
}
	render(){
		if(this.props.table[0]!=null){
			const tables=[];
			for(const t in this.props.table){
				tables.push(this.props.table[t]);
			}

			return( <div className="">
						<div className={styles.table_title}>View Table</div>
						<div className={styles.flex_container}>	
									
									{tables.map((result) => (
			                       <ListItemWrapper key={result._id} data={result} />
			        										))}
							</div>
					</div>
				
			)
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

manageTable(){
	browserHistory.push('/table/view/'+this.props.data._id);
}


  render() {
    return (<div className={styles.flex_item1} onClick={this.manageTable.bind(this)}>
    			      <h1 className={styles.title}>{_.capitalize(_.truncate(this.props.data.tableName,{'length': 30,
    			          			        'separator': ' '}))}</h1>
	          			  <div className={styles.details}>
	          			  	<lable> Number of Rows :</lable> {this.props.data.tableRowCount} <br/ >
	      					<lable> Number of Rows :</lable> {this.props.data.tableColumnCount} <br/>
	          			  </div>      
    			      
    			     <button className="btn btn-default edit_button">
    			      <Link to ={`/table/view/${this.props.data._id}`}><i className="fa fa-pencil fa-fw"></i>Edit</Link>
    			     </button>
    			     
    		</div>);
  }
}
function mapDispatchToProps(dispatch) {
  return {
  	fetchTable: ()=>dispatch(createAction(FETCH_TABLES)() ),
    dispatch,
  }
}


function mapStateToProps(state){

  return { table : state.table}
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewTable);