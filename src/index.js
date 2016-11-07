import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import _ from 'lodash';
import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import Table from './components/Table/table_index';
import SideBar from './components/Table/sidebar/sidebar';
import CreateTable from './components/Table/createtable/create_table'
import ViewTable from './components/Table/viewtable/viewtable';
import EditTable from './components/Table/viewtable/edittable/edittable';
import EditWrapper from './components/Table/viewtable/edittable/editwrapper';
import Cart_Index from './components/Cart/cart_index';
import {cartExport} from './components/Cart/cart_saga';
import {accountSaga} from './components/account/account_saga';
import {collab} from './components/collabaration/collab_saga';
import Auth0_login from './components/auth/auth0_login';
import AuthService from './utils/AuthService' 

import RequireAuth from './components/auth/require_auth';
import CreateAccount from './components/account/create_account';
import ViewAccount from './components/account/view_account';
import ManageAccount from './components/account/manage-account/manage_account.js';
import Auth0_lock from './components/auth/auth0_login';
import View_Template from './components/cart/view_template';
import Collabaration from './components/collabaration/collabaration_index.js';
import Joinroom from './components/collabaration/room/room_index';
import Chat from './components/collabaration/room/chat';

import reducers from './reducers';
import { Router , Route , IndexRoute , browserHistory } from 'react-router';
import {AUTH_USER} from './actions/types';
import {Config} from './sagas/rootsaga.js';
import {postTable , cart} from './components/table/table_sagas';

const sagaMiddleware = createSagaMiddleware()
const createStoreWithMiddleware = applyMiddleware(sagaMiddleware,reduxThunk,logger())(createStore);


const store = createStoreWithMiddleware(reducers);

// run sagas 
sagaMiddleware.run(Config);
sagaMiddleware.run(postTable);
sagaMiddleware.run(cart);
sagaMiddleware.run(cartExport);
sagaMiddleware.run(accountSaga);
sagaMiddleware.run(collab);



const token = localStorage.getItem('token');
// if token is present log back in 
if(token){
store.dispatch({type:AUTH_USER});

}

// dispatch boot up actions
store.dispatch({type:'CONFIG'});

const auth = new AuthService("owZUf4N2FAMGaOVj76SEi1LV35HCWtKL", "jcstest.auth0.com");
// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/signin' })
  }
}



ReactDOM.render(
  <Provider store={store}>

    <Router history ={browserHistory} >
      <Route path ="/" component = {App} >
        <Route path="/signin" component ={Auth0_login} />
        <Route path="/signout" component ={Signout} />
        <Route path="/signup" component ={Signup} />
        <Route path="/table" component ={Table} onEnter={requireAuth} >
          <Route path="/table/create" component= {CreateTable}/>
          <Route path="/table/view" component= {ViewTable}/>
          <Route path="/table/view/:id" component = {EditWrapper} />
          <Route path="/cart" component ={Cart_Index} />
          <Route path="/account" component={CreateAccount}/>
          <Route path ="/account/:id" component={ManageAccount}/>
          <Route path="/view_account" component={ViewAccount}/>
          <Route path="/view_template" component={View_Template}/>
          <Route path="/collabaration" component={Collabaration} />
          <Route path="/joinroom" component={Joinroom} />
          <Route path="/joinroom/:id" component={Chat} />
        </Route>
        
		<Route path="/feature" component={RequireAuth(Feature)}/>
      </Route>
  </Router>
  </Provider>
  , document.querySelector('.containerApp'));







