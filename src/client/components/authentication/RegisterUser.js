/* eslint-disable no-whitespace-before-property */
// components/RegisterScreen.jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../../redux/ redux-token-auth-config' // <-- note this is YOUR file, not the redux-token-auth NPM module
import './RegisterUser.css';
import {withRouter} from 'react-router-dom';
class RegisterScreen extends Component {
  constructor (props) {
      super(props);
      this.submitForm=this.submitForm.bind(this);
      this.handlePasswordChange=this.handlePasswordChange.bind(this)
      this.handleCirfmPwd=this.handleCirfmPwd.bind(this)
      this.state={
            email:'',
            password:'',
            password_confirmation:'',
            name:'',
            nickname:'',
            user_type:''
      };
   }
   
  submitForm = (event) => {
    if(this.state.password===this.state.password_confirmation){
      console.log("event",event)
      event.preventDefault()
      const { registerUser } = this.props;
      this.setState({
        name:event.target.name.value,
        email:event.target.email.value,
        password:event.target.password.value,
        user_type:event.target.type.value
      })
      console.log("email",this.state.email);
      console.log("name",this.state.name);
      registerUser({
        email: event.target.email.value,
        name: event.target.name.value,
        password: event.target.password.value,
        type: event.target.type.value,
        })
        .then((resp)=>{
            console.log(resp);
            this.props.history.push('/login');

        })
        .catch((error) => {
          debugger;
            console.log('error is ', error);
        })
      }
      else{
        alert('Both password must be same !!!!')
      }
  }
  handlePasswordChange=(event)=>{
    this.setState({
      password:event.target.value,
    }) 
  }
  handleCirfmPwd=(event)=>{
    this.setState({
      password_confirmation:event.target.value,
    }) 
  }
  render () {
    const { submitForm } = this
    return(
    <div>
      <center>
        <h1>Register</h1>
          <form onSubmit={submitForm}>
          Name:<input type="text" name="name" className="input input1"/>
          <br />
          <br />
          Email:<input type="eamil" name="email" className="input input1"/>
          <br/>
          <br/>
          Password:<input type="password" name="password" className="input input2" onChange={this.handlePasswordChange}/>
          <br/>
          <br />
          Confirm Password:<input type="password" name="confirmPassword" className="input input2" onChange={this.handleCirfmPwd}/>
          <br/>
          <br />
          Type:
          <select name="type">
              <option value="Developer">Developer</option>
              <option value="Qa">Qa</option>
              <option value="Manager">Manager</option>
            </select>
          <br />
          <button type="submit" className="button button1">Submit</button>
          </form>
        </center>
    </div>
    )
  }
}

export default connect(
  null,
  { registerUser },
)(RegisterScreen)