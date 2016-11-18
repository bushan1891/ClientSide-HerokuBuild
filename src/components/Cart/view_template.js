import React ,{Component } from 'react';
import {Link} from 'react-router';
import styles from './styles.css';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import { createAction } from 'redux-actions';
import {FETCH_TEMPLATES , DELETE_TEMPLATE} from './types';
import _ from 'lodash';

class View_Template extends Component {

componentWillMount(){
	// get all template
  if(this.props.templates.length==0){
    this.props.fetchTemplate();
  }
  this.props.fetchTemplate();
}

deleteTemplate(data){
  this.props.deleteTemplate(data._id);
}
	
	render(){
  const templates = this.props.templates;
  const deleteTemplate = this.props.deleteTemplate;
          if(templates.length==0){
            return(
            <div className={styles.table_view_container}>
                Loading... 
              </div>
            )
          }
          else if(templates.length>0){
              return (
              <div className={styles.container}>
               <div className={styles.title}>View Template</div>
               <div className={styles.flex_container}>
                    { templates.map(function(template){
                        return(
                          <ListItemWrapper key={template._id} data={template} dtemplate={deleteTemplate} ></ListItemWrapper>
                        )
                    })}
                 </div>   
                
              </div>
              )
          }
			
}
}


class ListItemWrapper extends React.Component {
  
  delete(){
    
    this.props.dtemplate(this.props.data._id);
  }

  render() {
    const data = this.props.data;
    return (<div className={styles.flex_item1}>
    			      <h1 className={styles.title}>{_.toUpper(data.templateName)}</h1>
                <div className={styles.details}>
                  <lable className={styles.lable}>Cart Items : </lable> <span className="">{data.cart.length} </span>
                  <div className={styles.deleteBtn}><button className="btn btn-default" onClick={this.delete.bind(this)} >Delete Template</button>   </div>
                  
                </div>
    			     
    		</div>);
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchTemplate: () => dispatch(createAction(FETCH_TEMPLATES)()),
    deleteTemplate:(id) =>dispatch(createAction(DELETE_TEMPLATE)(id)),
    dispatch,
  }
}


function mapStateToProps(state){

  return { table : state.table,
    templates:state.templates
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(View_Template);