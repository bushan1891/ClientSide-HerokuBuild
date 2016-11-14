import React , {Component} from 'react';
import styles from '../styles.css';
import {Link }from 'react-router';
import {connect} from 'react-redux';

class SideBar extends Component{	

	renderCartCount(){
		if(this.props.cart.table.length >0){
			return(<div className={styles.count} >
					<div className="animated rubberBand">{this.props.cart.table.length}</div>
				   </div>
				)
		}
		else{
			return(
			<div></div>
			)
		}
	}

	render(){
		return(
			<div className={styles.side_container}>
			<h2 className={styles.module_heading}>WBS-MODULES</h2>
			<ul className={styles.side_list}>
				<li className={styles.item}><Link to="/table/create">Create New WBS</Link></li>
				<li className={styles.item}><Link to="/table/view">View WBS</Link></li>
			</ul>
			<h2 className={styles.module_heading}>SELECTIONS</h2>
			<ul className={styles.side_list}>
				<li className={styles.item}><Link to="/cart">Selected Modules</Link>
				{this.renderCartCount()}
				</li>
				<li className={styles.item}><Link to="/view_template">Saved WBS Module</Link></li>
			</ul>
			<h2 className={styles.module_heading}>CUSTOMER</h2>
			<ul className={styles.side_list}>
				<li className={styles.item}><Link to="/account">Create Customer</Link></li>
				<li className={styles.item}><Link to="/view_account">View Customer</Link></li>
			</ul>
			<h2 className={styles.module_heading}>COLLABARATION</h2>
			<ul className={styles.side_list}>
				<li className={styles.item}><Link to="/collabaration">CreateRoom</Link></li>
				<li className={styles.item}><Link to="/joinroom">JoinRoom</Link></li>
			</ul>

		</div>
			)
		
	}
}

function mapStateToProps(state){
	return{
		cart:state.cart,
	}
}

export default connect(mapStateToProps,null)(SideBar);