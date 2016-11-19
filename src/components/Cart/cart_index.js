import { CART_ITEM , NEW_CART_ITEM , NEW_CART} from '../Table/viewtable/edittable/types';
import {SAVE_AS_TEMPLATE} from './types';
import React , { Component} from 'react';
import {connect} from 'react-redux';
import styles from './styles.css';
import Cart_Edit from './cart-edit';
import {Link} from 'react-router';
import {CREATEWBS} from './types';
import { createAction } from 'redux-actions';
import ReactTooltip from 'react-tooltip';
class Cart_Index extends Component{

renderTable(table){
			if(table){
				return(
					<Cart_Edit data={table} key={table._id}/>
					)
			}
}	

saveAsTemplate(){


const createTemplate = this.props.createTemplate;
const cart =this.props.cart;
	if(this.props.cart.table.length==0){
		swal('Cart Is empty');
	}
	else{
	swal({   
		     title: "An input!",
	         text: "Enter the Template Title",
	         type: "input",   
	         showCancelButton: true, 
	         closeOnConfirm: false, 
             animation: "slide-from-top",
             inputPlaceholder: "{CompanyName} - SOW {Number} - {ModuleName}" },
      function(inputValue){
             if (inputValue === false)
	                  return false;      
           
              if (inputValue === "") 
              	{   
              	  swal.showInputError("You need to write something!");
              	       return false  
      	        } 
      	        if(inputValue!= "" ) {
      	        swal("Nice!", "You wrote: " + inputValue, "success");
				
				createTemplate({cart:cart.table,title:inputValue});

      	        }   
	        	

	       });
		
	
	}



}

generateWBS(){
	let cartName='';
	const cart = this.props.cart;
	const createWBS=this.props.createWBS;
	if(this.props.cart.table.length>0){
		swal({   title: "An input!",  
		 text: "", 
		 type: "input",   showCancelButton: true,   
		 closeOnConfirm: false,   animation: "slide-from-top",  
		 inputPlaceholder: "{CompanyName} - SOW {Number} - {ModuleName}" },
		     
		  function(inputValue){   
		      if (inputValue === false) 
		      	return false;  
		      
		      if (inputValue === "") { 
	       
	           swal.showInputError("You need to write something!");
	                return false   
	            }      
			
				cartName=inputValue;
	            swal("Nice!", "You wrote: " + inputValue, "success");
	            createWBS({cart_name:inputValue,data:cart.table});
		   
		   });
			

	}
	else{
		swal('Cart Empty !');
	}

}


render(){
	const cart = this.props.cart;
	if(cart.table.length==0){
		swal('Cart Is empty');
	}

	return(
		<div className="">
		<div className={styles.title}>Current Selected Elements </div>
			<div className={styles.sub_nav}>
			<ul className="nav navbar-nav navbar-right">
					<li className="nav-item"> 
				        <Link data-tip="Saves this configuration as a template ,<br /> which can be assigned to a customer " onClick={this.saveAsTemplate.bind(this)} className="nav-link">
				        <div className={styles.pointer_cursor}>
				        <i className="fa fa-file-text fa-fw"></i>
				        Save Template
				        </div>
				        </Link>
			        </li>
			      

			        <li className="nav-item pull-xs-right  right"> 
				        <Link data-tip="Generates a excel sheet <br /> with your selected items" onClick={this.generateWBS.bind(this)} className="nav-link">
				        <div className={styles.pointer_cursor}>
				        <i className="fa fa-file-word-o fa-fw"></i>
				        Generate SOW
				        </div>
				        </Link>
				        <ReactTooltip place="bottom" type="dark" effect="float" multiline="ture"/>
			        </li> 
		       </ul>
			</div>
			<div className={styles.cart_table_container}>
			{cart.table.map((obj)=>this.renderTable(obj))}
			</div>		
		</div>
		)

	}
}

  // <li className="nav-item pull-xs-right right"> 
		// 		        <Link data-tip="Need to replace this text !!!" onClick={this.generateWBS.bind(this)} className="nav-link">
		// 		        <div className={styles.pointer_cursor}>
		// 		        <i className="fa fa-file-text fa-fw"></i>
		// 		        Generate WBS
		// 		        </div>
		// 		        </Link>
		// 	        </li> 

function mapDispatchToProps(dispatch){
return{
	createWBS : (data)=>dispatch(createAction(CREATEWBS)(data)),
	createTemplate : (data) => dispatch(createAction(SAVE_AS_TEMPLATE)(data))
}
}

function mapStateProps(state){
	return{
		cart:state.cart,
	}
}

export default connect(mapStateProps,mapDispatchToProps)(Cart_Index);