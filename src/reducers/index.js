import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import config from './config_reducer';

import template from '../components/Cart/template_reducer';
import cart from '../components/Cart/cart_reducer';
import table from '../components/Table/table_reducer';
import account from '../components/account/account_reducer';
import templates  from '../components/account/templates_reducer';
import collabaration from '../components/collabaration/collab_reducer';
import auth0 from '../components/auth/auth0_reducer';

const rootReducer = combineReducers({
  form,
  auth:authReducer,
  config:config,
  table:table,
  template:template,
  cart:cart,
  account:account,
  templates:templates,
  collabaration:collabaration,
  auth0:auth0,
});

export default rootReducer;
