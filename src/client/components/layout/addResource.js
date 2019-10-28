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

class addResource extends Component {

  state={
    projects:[],
    value:null,
    UserType:null
  }
  constructor( props ){
    super( props );
    this.showAllDev = this.showAllDev.bind(this);

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
    const data={
      id:localStorage.getItem('project_id')
    }
    const url='http://localhost:3001/api/v1/projects/showProjectDev '
    axios.get(url,config,data).then((resp)=>{
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

  showAllDev=()=>{
    let config = {
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'uid': localStorage.getItem('uid'),
        'token-type':  localStorage.getItem('uid'),
        'client': localStorage.getItem('client')
      }
    }
    const data={
      name:'Developer'
    }
    const url='http://localhost:3001/api/v1/users '
    axios.get(url,data).then((resp)=>{
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
  showAllQa=()=>{
    let config = {
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'uid': localStorage.getItem('uid'),
        'token-type':  localStorage.getItem('uid'),
        'client': localStorage.getItem('client')
      }
    }
    const data={
      name:'Qa'
    }
    const url='http://localhost:3001/api/v1/users '
    axios.get(url,data).then((resp)=>{
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
  render () {
    const type=store.getState().reduxTokenAuth.currentUser.attributes.type;
    return(
        <div>
          <h1>{type} DashBoard</h1><br />
          <center><h1>Add Resource</h1></center>
          <button type="button" onClick={() => this.showAllDev()}>Show All Developers</button>
          <button type="button" onClick={() => this.showAllQa()}>Show All Qa</button>

          <h3>ALL Developers</h3>
          <br />
          <table>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>DeadLine</th>
            <th>status</th>
            <th>id</th>
          </tr>
          </table>

        </div>
    )
  }
}


export default addResource;