import React ,{Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
	componentWillMount(){
		this.props.fetchMessage();
	}

	render(){
		return(
			<div >
<iframe src="http://jcsdemo.com/#/login" width="100%" height="600px" />

			</div>
			)
	}
}

export default connect(null,actions)(Feature) ;