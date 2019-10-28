// components/RegisterScreen.jsx
import React, { Component } from 'react'
import axios from 'axios';
import store from '../../redux/Store'
import './Home.css';
import { connect } from 'react-redux'
 import { assignBug } from '../../redux/actions/bug'

class VeiwBug extends Component {

  state={
    bugs:[],
    value:null
  }
  constructor( props ){
    super( props );
    this.assignBug = this.assignBug.bind(this);
    this.resolvedBug = this.resolvedBug.bind(this);
  }
  componentDidMount(){
    let config = {
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'uid': localStorage.getItem('uid'),
        'token-type':  localStorage.getItem('uid'),
        'client': localStorage.getItem('client')
      }
    }
    const project_id=localStorage.getItem('project_id');
    const data={
        project_id,
    }
    const url='http://localhost:3001/api/v1/projects/'+project_id+'/bugs'
    axios.get(url,config,data).then((resp)=>{
      console.log("complete response from backend",resp);
      var response=resp.data;
      console.log("response data",response)
      this.setState({
        bugs:response
      })
     
    }).catch((error)=>{
      debugger;
    })
  }
  assignBug=(bugId)=>{
   const project_id=localStorage.getItem('project_id');
   debugger
   this.props.assignBug(project_id,bugId)
  }
  resolvedBug=(bugId)=>{
    debugger
  }
  render () {
    const type=store.getState().reduxTokenAuth.currentUser.attributes.type;
    return(
        <div>
          <center><h1>All Bugs of Projects</h1></center>
          <table>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>DeadLine</th>
            <th>status</th>
            <th>type</th>            
            <th>id</th>
          </tr>          
          {this.state.bugs.map((bug,key) => 
          
          <tr key={key}>
            <td>{key+1}</td>
            <td>{bug.title}</td>
            <td>{bug.deadline}</td>
            <td>{bug.status}</td>
            <td>{bug.bugType}</td>
            <td>{bug.id}</td>
            {type==='Developer'?(<div>
            <button type="button" onClick={() => this.assignBug(bug.id)}>Assign to me</button>
            
            </div>):(<p></p>)}
          </tr>
          )}
          </table>
        </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  assignBug: (project_id,bugId) => dispatch(assignBug(project_id,bugId))
})
const mapStateToProps = (state) => ({
  
})
export default connect(mapStateToProps , mapDispatchToProps)(VeiwBug) ;