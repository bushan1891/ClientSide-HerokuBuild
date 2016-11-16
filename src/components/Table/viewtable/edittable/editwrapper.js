import React , {Component} from 'react'; 
import ReactDataGrid from 'react-data-grid';
import ReactDataGridPlugins from 'react-data-grid/addons';
import styles from './styles.css';
import {connect} from 'react-redux';
import EditTable from './edittable';
import SweetAlert from 'sweetalert-react';
import {createAction} from 'redux-actions';
import {CART_ITEM , NEW_CART_ITEM} from './types';
import _ from 'lodash';

class EditWrapper extends Component{	

  saveNewTable(index,table){
         var cart_item = {...table,slectedIndex:index} ;

        cart_item.slectedIndex.forEach(function(item){
          cart_item.tableRows[item]['In Scope']= "Yes";
        })
        // mark rest in scope to no

        

     this.props.cart_item(cart_item);
  }

   render() {
for(var t in this.props.table ){
		if(this.props.params.id==this.props.table[t]._id){
			return (
			      <div className={styles.editable_container}>
               <div className={styles.title_table}>{_.toUpper(this.props.table[t].tableName)}</div> 
			         <EditTable data={this.props.table[t]} onSave={this.saveNewTable.bind(this)}/ >
			      </div>
    			);
		}
	}
    return (
      <div>
         {swal("Cancelled", "No data", "error") }
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return {
    cart_item: (data)=>dispatch(createAction(CART_ITEM)(data) ),
    dispatch,
  }
}
function mapStateToProps(state){

  return { table : state.table}
}

export default connect (mapStateToProps,mapDispatchToProps)(EditWrapper);