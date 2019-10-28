// components/SignInScreen.jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signInUser } from '../../redux/ redux-token-auth-config' // <-- note this is YOUR file, not the redux-token-auth NPM module
import './SignInUser.css';
import store from '../../redux/Store'
class SignInScreen extends Component {
  constructor (props) { 
      super(props)
      this.state={
        email: 'test@gmail.com',
        password: '1234214'
    }
      this.submitForm=this.submitForm.bind(this);     
   }
  submitForm = (event) => {
    event.preventDefault()
    const { signInUser } = this.props

    signInUser({ 
      email: event.target.email.value, 
      password: event.target.password.value })
    .then((response)=>{
        console.log('response',response);
        const state=store.getState();
        const isLogin=state.reduxTokenAuth.currentUser.isSignedIn
        const type=state.reduxTokenAuth.currentUser.attributes.type
        console.log('type',type);
        localStorage.setItem('type',type)
        if(isLogin===true){
          this.props.history.push('/home');

        }
    })
    .catch((error) => {
        console.log('error is ', error);
    })
  }

  render () {
    const { submitForm } = this
    return(
      <div>
        <center>
          <h1>Login </h1>
          <form onSubmit={submitForm}>
            Email:<input type="text" name="email" className="input input1"/>
            <br/>
            <br/>
            Password:<input type="password" name="password" className="input input2"/>
            <br/>
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
  { signInUser },
)(SignInScreen)