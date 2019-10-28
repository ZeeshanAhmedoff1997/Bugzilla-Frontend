/* eslint-disable no-whitespace-before-property */
// components/RegisterScreen.jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'
 // <-- note this is YOUR file, not the redux-token-auth NPM module
 import { addBug } from '../../redux/actions/bug'
 import './bug.css';
class Bug extends Component {
  constructor (props) {
      super(props);
      this.submitForm=this.submitForm.bind(this);
      this.state={
        value:"feature"
      };
   }
   
  submitForm = (event) => {
    console.log("event",event)
    event.preventDefault()
  
    const inputObj={
      title:event.target.title.value,
      bugType:event.target.type.value,
      status:event.target.typeValue.value,
      deadline:event.target.deadline.value,
      images:event.target.pic.value,
      project_id:7
    }
    console.log("inpt object",inputObj)
    this.props.addBug(inputObj)
  }
  handleChange=(event)=>{
    this.setState({
      value:event.target.value
    })
    console.log("event",event.target.value); 
    
  }
  render () {
    const { submitForm } = this
    return(
    <div>
      <center>
          <h1>Add Bug</h1>
          <form onSubmit={submitForm}>
            title:<input type="text" name="title" className="input input1" required/>
            <br />
            <br />
            Deadline:<input type="date" name="deadline" className="input input1" name="deadline" min="2017-04-01" max="2020-04-30"/>
            <br/>
            <br/>
            ScreenShot:<input type="file" name="pic" accept="image/*" />
            <br/>
            <br />
            type:
            <select onChange={this.handleChange} name="type">
                  <option value="feature">Feature</option>
                  <option value="bug">Bug</option>
            </select>         
            <br />
            <br/>
            value
            {this.state.value==="feature"?
            <select name="typeValue">
              <option value="new">new</option>
              <option value="started">started</option>
              <option value="completed">completed</option>
            </select>:
            <select name="typeValue">
              <option value="new">new</option>
              <option value="started">started</option>
              <option value="resolved">resolved</option>
            </select>}
            <br/>
            <button type="submit" className="button button1">Submit</button>
          </form>
        </center>
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addBug: (inputObj) => dispatch( addBug(inputObj) ),
})
const mapStateToProps = (state) => ({
  
})
export default connect(mapStateToProps , mapDispatchToProps)(Bug) ;