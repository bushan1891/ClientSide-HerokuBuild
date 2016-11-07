import React ,{Component } from 'react';
import {Link} from 'react-router';
import styles from '../styles.css';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import { createAction } from 'redux-actions';
import {FETCH_ROOMS} from '../types';
import { browserHistory} from 'react-router';

class View_Template extends Component {

componentWillMount(){
  console.log(this.props);
  const rooms = this.props.collabaration.rooms;
	// get all template
  if(rooms.length==0){
    this.props.fetchRooms();
  }
  
}
	

	render(){
  const rooms = this.props.collabaration.rooms;
  
          if(rooms.length==0){
            return(
            <div className={styles.table_view_container}>
                Loading... not implimented yet 
              </div>
            )
          }
          else if(rooms.length>0){
              return (
              <div className={styles.container}>
               <div className={styles.title}>View Template</div>
               <div className={styles.flex_container}>
                    { rooms.map(function(collab){
                        return(
                          <ListItemWrapper key={collab._id} data={collab} ></ListItemWrapper>
                        )
                    })}
                 </div>   
                
              </div>
              )
          }
			
}
}


class ListItemWrapper extends React.Component {

onClick(){
     browserHistory.push('/joinroom/'+this.props.data._id);
  }

  render() {
    const data = this.props.data;
    return (<div className={styles.flex_item1} onClick={this.onClick.bind(this)}>
    			      <h1 className={styles.title}>{data.rooms[0].roomName}</h1>
                <div className={styles.details}>
                <div className={styles.detailItem}>Message Count : {data.rooms[0].Message.length}</div>
                <div className={styles.detailItem}>Owner : {data.rooms[0].owner}</div>
                <div className></div>
                </div>
    			     
    		</div>);
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchRooms: () => dispatch(createAction(FETCH_ROOMS)()),
    dispatch,
  }
}


function mapStateToProps(state){

  return { 
    collabaration:state.collabaration,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(View_Template);