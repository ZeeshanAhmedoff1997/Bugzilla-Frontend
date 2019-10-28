// components/RegisterScreen.jsx
import React, { Component } from 'react'
import './header.css';
class Home extends Component {
 

  render () {
    return(
        <div>
            <div className="header">
              <a href="#default" className="logo">BugZilla</a>
              <div className="header-right">
                <a className="active" href="#home">Home</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
              </div>
            </div>
            <div >
              <h1>Responsive Header</h1>
              <p>Resize the browser window to see the effect.</p>
              <p>Some content..</p>
            </div>
        </div>
    )
  }
}

export default Home;