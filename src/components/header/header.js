import React from 'react';
import {connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './styles.css';
import AuthService from '../../utils/AuthService'
class Header extends React.Component {

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

renderLinks(){
    const auth = new AuthService("owZUf4N2FAMGaOVj76SEi1LV35HCWtKL", "jcstest.auth0.com");
  if(this.props.auth0.auth){
    return (
      <ul className="nav navbar-nav navbar-right">
       <li className="nav-item">
              <Link to="/table" className="nav-link">Table</Link>
       </li>
        <li className="nav-item pull-xs-right">
        <Link to="/signout" className="nav-link" onClick={auth.logout}>Sign out</Link>
        </li> 
        <li className="nav-item pull-xs-right"> 
        <Link to="/cart" className="nav-link"><i className="fa fa-shopping-cart fa-fw"></i>Cart   {this.renderCartCount()} 
        </Link>
        </li> 
      </ul>
    )
  } else{
    return  [
      <li className="nav-item" key={1}>
          <Link to="/signin" className="nav-link">Sign in</Link>
      </li> ,

      <li className="nav-item" key={2}>
          <Link to="/signup" className="nav-link">Sign Up</Link>
      </li>

    ]

  }
}

  render(){
    return (
      <nav className="navbar nav" >
        <Link to="/" className="navbar-brand" >JCS</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    )

  }
}

function mapStateToProps(state){
return {
  authenticated: state.auth.authenticated,
  auth0:state.auth0,
  cart:state.cart,
}
}

export default connect(mapStateToProps)(Header);
