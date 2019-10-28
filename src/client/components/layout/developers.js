// components/RegisterScreen.jsx
import React, { Component } from 'react'
import axios from 'axios';
import Bug from '../layout/bug'
import { Redirect } from 'react-router-dom';
import store from '../../redux/Store'
import './Home.css';
import { connect } from 'react-redux'
import { deleteProject } from '../../redux/actions/project'
import {withRouter} from 'react-router-dom';

class showDeveloper extends Component {

  state={
    projects:[],
    value:null,
    UserType:null
  }
  constructor( props ){
    super( props );
    this.editProject = this.editProject.bind(this);

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
    const type=localStorage.getItem('t')
    debugger
    const url='http://localhost:3001/api/v1/users'
    const data={
        type
    }
    axios.get(url,config,{type}).then((resp)=>{
      console.log("complete response from backend",resp);
      var response=resp.data;
      console.log("response data",response)
      this.setState({
        projects:response,
        
      })  
    }).catch((error)=>{
      debugger;
    })
  }

  editProject=(projId)=>{
   
    localStorage.setItem('project_id',projId)
    this.props.history.push('/project');
  }
  render () {
    const type=store.getState().reduxTokenAuth.currentUser.attributes.type;
    return(
        <div>
          <center><h1>Welcome to Home Page</h1></center>
          <h3>Developers Details</h3><br />
          <table>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>DeadLine</th>
            <th>status</th>
            <th>id</th>
          </tr>          
          {this.state.projects.map((proj,key) => 
          
          <tr key={key}>
            <td>{key}</td>
            <td>{proj.title}</td>
            <td>{proj.deadline}</td>
            <td>{proj.status}</td>
            <td>{proj.id}</td>
          </tr>
          )}
          </table>
        </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
//   deleteProject: (project_id) => dispatch(deleteProject(project_id))
})
const mapStateToProps = (state) => ({
  
})
export default connect(mapStateToProps , mapDispatchToProps)(showDeveloper) ;