import React ,{Component } from 'react';
import {Link} from 'react-router';
import styles from '../styles.css';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import { createAction } from 'redux-actions';
import {FETCH_ROOMS} from '../types';
import {
  SocketProvider,
  socketConnect,
} from 'socket.io-react';
import io from 'socket.io-client';
const socket = io.connect('https://warm-mesa-71741.herokuapp.com/');

socket.on('incoming', msg => console.log(msg));
class Chat extends Component{
	constructor(props){
		super(props);
		this.state= {
            // initialize messages array with welcome message
            value:'',
            messages: [{
                timeStamp: Date.now(), 
                text: "Welcome to the test chat app!",
                sender:''
            }]
        }
        
	}

	 onMessageAdded(message) {
	        // update the array (setState re-renders the component)
	        console.log(this.state)
	        let temp = [{timeStamp: Date.now(), 
	                text:message }]
	        this.setState({messages: this.state.messages.concat(temp)});
	    }

	componentDidMount(){
				socket.on('incoming',this.onMessageAdded.bind(this))
	}

	 handleChange(ev) {
		console.log(ev.target.value)
		this.setState({value:ev.target.value})
		 }

  postMessage(){
	socket.emit('chat message', this.state.value);
	let temp = [{timeStamp: Date.now(), 
                text: this.state.value,
            	sender:'true'}]
	this.setState({messages: this.state.messages.concat(temp)});
	this.setState({value:''});
  }

	render(){
		const collabaration = this.props.collabaration.rooms;
		const id=this.props.params.id;
		console.log(this.state);
		let room=[];
			collabaration.forEach(function(collab){
				if(collab._id==id){
					room=collab;
				}
			})
			if(room.length==0){
				swal('Room not loaded!')
			}
		let lobby = room.rooms[0];

		return (
			<div className="">
			<div className={styles.title}> {lobby.roomName}</div>
				<div className={styles.msglist}>
					<ul className={styles.container}>
						{this.state.messages.map(function(msg){
					 		if(msg.sender=='true'){
					 			return(
								<li className={styles.msg} key={msg.timeStamp}>{msg.text}</li>
					 			)
					 		}
					 		else{
								return(
								<li className={styles.msgreceived} key={msg.timeStamp}>{msg.text}</li>
								)
					 		}
					 	  })}
					</ul>
				 	
				</div>		
				 <div className={styles.msgbox}>
			        <textarea
			          name='message'
			          placeholder='Enter a message'
			          value={this.props.value}
			          onChange={this.handleChange.bind(this)}
			          />
			          <button type="submit" className="btn btn-default" onClick={this.postMessage.bind(this)}>Send</button>
			      </div>
			</div>
			)
	}
}

function mapDispatchToProps(dispatch){
	return{ dispatch,
		}
}

function mapStateToProps(state){
	return{
		collabaration:state.collabaration,
	}
}

export default connect (mapStateToProps,mapDispatchToProps)(Chat);