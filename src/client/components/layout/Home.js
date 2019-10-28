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

class Home extends Component {

  state={
    projects:[],
    value:null,
    UserType:null
  }
  constructor( props ){
    super( props );
    this.addBug = this.addBug.bind(this);
    this.editProject = this.editProject.bind(this);
    this.delProject = this.delProject.bind(this);
    this.viewBug = this.viewBug.bind(this);
    this.addResource = this.addResource.bind(this);
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
    localStorage.removeItem('project_id');
    const state=store.getState();
    const type=state.reduxTokenAuth.currentUser.attributes.type
    console.log('type',type);

    this.setState({
      UserType:type
    })
    // console.log('Usertype',this.state.UserType);
    const url='http://localhost:3001/api/v1/projects '
    axios.get(url,config).then((resp)=>{
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
  addProject = ()=>{
    this.props.history.push('/project/new');

  }
  addBug=(projId)=>{
    localStorage.setItem('project_id',projId)
    this.props.history.push('/bug/new');
      
  }
  editProject=(projId)=>{
   
    localStorage.setItem('project_id',projId)
    this.props.history.push('/project/new');
  }
  delProject=(project_id)=>{
    this.props.deleteProject(project_id);
    
  }
  addResource=(projId)=>{
    localStorage.setItem('project_id',projId)
    // localStorage.setItem('t','Developer')
    this.props.history.push('/addResource');


  }

  viewBug=(projId)=>{
    localStorage.setItem('project_id',projId)
    this.props.history.push('/bugs/index');
  }
  render () {
    const type=store.getState().reduxTokenAuth.currentUser.attributes.type;
    return(
        <div>
          <center><h1>Welcome to Home Page</h1></center>
          <h1>{type} DashBoard</h1><br />
          {type==='Manager'?(<div>
            <button type="button" onClick={() => this.addProject()}>Add Project</button>
              
            </div>):(<p></p>)}
          
          <h3>Project Details</h3>
          <br />
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
            <td>{key+1}</td>
            <td>{proj.title}</td>
            <td>{proj.deadline}</td>
            <td>{proj.status}</td>
            <td>{proj.id}</td>
            {type==='Qa'?(<div>
              <button type="button" onClick={() => this.addBug(proj.id)}>Add Bug</button>
              <button type="button" onClick={() => this.viewBug(proj.id)}>View Bugs</button>
            </div>):(<p></p>)}
            {type==='Manager'?(<div>
              <button type="button" onClick={() => this.editProject(proj.id)}>Edit Project</button>
              <button type="button" onClick={() => this.delProject(proj.id)}>Delete Project</button>
              <button type="button" onClick={() => this.addResource(proj.id)}>Add Resource</button>
            </div>):(<p></p>)}
            {type==='Developer'?(<div>
            <button type="button" onClick={() => this.viewBug(proj.id)}>View Bugs</button>
            </div>):(<p></p>)}
          </tr>
          )}
          </table>
          <h3>{this.state.projects.length==0?'No Projects to Show':''}</h3> 

        </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteProject: (project_id) => dispatch(deleteProject(project_id))
})
const mapStateToProps = (state) => ({
  
})
export default connect(mapStateToProps , mapDispatchToProps)(Home) ;