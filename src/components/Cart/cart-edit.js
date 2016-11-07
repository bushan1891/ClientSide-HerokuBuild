import React,{Component} from 'react';
import {connect} from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import ReactDataGridPlugins from 'react-data-grid/addons';
import styles from './styles.css'
class Cart_Edit extends Component{
	


	renderTables(){
		const columns =this.props.data.tableHeader;
		const tableRows=this.props.data.tableRows;

			return(
			<div className={styles.cart_table} key={this.props.data._id}>
				<div className={styles.table_title}>{this.props.data.tableName}</div>
				<ReactDataGrid
			    columns={columns}
			    rowGetter={(i)=>this.props.data.tableRows[i]}
			    rowsCount={tableRows.length}
			    minHeight={250} />
			</div>
			)
	}


	render(){
		return (
			<div>
				{this.renderTables()}
			</div>
			)
	}
}

function mapStateToProps(state){
	return{
	cart:state.cart,
	}
}
function mapDispatchToProps(state){
	return {
	
	}
}
export default connect (mapStateToProps,mapDispatchToProps)(Cart_Edit);