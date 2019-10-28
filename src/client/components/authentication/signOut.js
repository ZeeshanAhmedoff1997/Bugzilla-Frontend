// components/SiteHeader.jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signOutUser } from '../../redux/ redux-token-auth-config' // <-- note this is YOUR file, not the redux-token-auth NPM module

class logOut extends Component {
  constructor (props) {
    super(props);
    this.signOut=this.signOut.bind(this);
  }

  signOut (e) {
    console.log("logout is called");
    e.preventDefault()
    const { signOutUser } = this.props
    signOutUser() 
    .then((resp)=>{
        debugger;
        console.log(resp);
    })
    .catch((error) => {
      debugger;
        console.log('error is ', error);
    })
  }

  render () {
    const { signOut } = this
    return(
        <div>
             <a href="#" onClick={signOut}>Sign Out</a>
        </div>
    )
  }
}

export default connect(
  null,
  { signOutUser },
)(logOut)