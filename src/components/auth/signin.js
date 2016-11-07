import React , { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import styles from './styles.css';

class Signin extends Component {
// this works with redux-form 5.0.1
handleFormSubmit({ email ,password }){
console.log(email , password);
this.props.signinUser({email,password})
}
renderAlert(){
  if(this.props.errorMessage){
    return(<div className="alert alert-danger">
        <strong>OOPS!! </strong> {this.props.errorMessage}
    </div>)
  }
}

  render() {
  const { handleSubmit ,fields:{ email , password } } = this.props;
  return (
    <form className={styles.form} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      <fieldset className="form-group">
        <lable>Email:</lable>
        <input { ...email } className="form-control" />
      </fieldset>
      <fieldset className="form-group">
        <lable>Password:</lable>
        <input { ...password } type="password" className="form-control" />
      </fieldset>
      {this.renderAlert()}
      <button action="submit" className="btn btn-primary" >Sign in</button>
    </form>
)

}
}
function mapStateToProps(state){
  return{ errorMessage : state.auth.error }
}

export default reduxForm({
  form:'signin',
  fields:['email','password']
},mapStateToProps,actions)(Signin);
