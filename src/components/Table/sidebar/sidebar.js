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
				<li className={styles.item}><Link to="/table/create"><button className="btn btn-default customBtn">Create New WBS</button></Link></li>
				<li className={styles.item}><Link to="/table/view"><button className="btn btn-default customBtn">View WBS</button></Link></li>
			</ul>
			<h2 className={styles.module_heading}>SELECTIONS</h2>
			<ul className={styles.side_list}>
				<li className={styles.item}><Link to="/cart"><button className="btn btn-default customBtn">Selected Modules</button></Link>
				{this.renderCartCount()}
				</li>
				<li className={styles.item}><Link to="/view_template"><button className="btn btn-default customBtn">Saved WBS Module</button></Link></li>
			</ul>
			<h2 className={styles.module_heading}>CUSTOMER</h2>
			<ul className={styles.side_list}>
				<li className={styles.item}><Link to="/account"><button className="btn btn-default customBtn">Create Customer</button></Link></li>
				<li className={styles.item}><Link to="/view_account"><button className="btn btn-default customBtn">View Customer</button></Link></li>
			</ul>
			<h2 className={styles.module_heading}>COLLABARATION</h2>
			<ul className={styles.side_list}>
				<li className={styles.item}><Link to="/collabaration"><button className="btn btn-default customBtn">CreateRoom</button></Link></li>
				<li className={styles.item}><Link to="/joinroom"><button className="btn btn-default customBtn">JoinRoom</button></Link></li>
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