import React ,{Component} from 'react';


export default class DisplayList extends Component{
	
	render(){
		
		return (
			<div>
				{this.props.data[0]}
			</div>		

		)
	}
}