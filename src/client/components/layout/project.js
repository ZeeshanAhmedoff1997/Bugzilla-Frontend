
import React, { Component } from 'react'
import { connect } from 'react-redux'
 import { addProject,editProject } from '../../redux/actions/project'
 import axios from 'axios';
 import './bug.css';
class Project extends Component {
  constructor (props) {
      super(props);
      this.submitForm=this.submitForm.bind(this);
      this.state={
        value: "feature",
        edit: false,
        title: null,
        deadline: null,
        project_id:null
      };
   }
   componentDidMount(){
     const projId=localStorage.getItem('project_id')
     if(projId!== null){
        this.setState({
          edit:true,
          project_id:projId
        })
        let config = {
          headers: {
            'access-token': localStorage.getItem('access-token'),
            'uid': localStorage.getItem('uid'),
            'token-type':  localStorage.getItem('uid'),
            'client': localStorage.getItem('client')
          }
        }
        const data={
          project_id:projId
        }
          const url='http://localhost:3001/api/v1/projects/'+projId
          axios.get(url,config).then((resp)=>{
          console.log("complete response from backend",resp);
          var response=resp.data;
          console.log("response data",response)
          console.log("title",response.title)
          this.setState({
            title:response.title,
            deadline:response.deadline,
          })  
        }).catch((error)=>{
        })
     }
   }
  submitForm = (event) => {
    console.log("event",event)
    event.preventDefault()
    if(this.state.edit===false){
      const inputObj={
        title:event.target.title.value,
        deadline:event.target.deadline.value,
        manager_id:localStorage.getItem('uid')
      }
      console.log("inpt object",inputObj)
      this.props.addProject(inputObj)
    }else{
      const inputObj={
        title:event.target.title.value,
        deadline:event.target.deadline.value,
        manager_id:localStorage.getItem('uid'),
        project_id:localStorage.getItem('project_id')                       //Hard Core Value of Project
      }
      console.log("inpt object",inputObj)
      this.props.editProject(inputObj)
    }
  }
  handleTitleChange=(event)=>{
    this.setState({
      title:event.target.name.value,
    })
    console.log("event",event.target.value); 
    
  }
  handleDealineChange=(event)=>{
    this.setState({
      title:event.target.deadline.value,
    })
    console.log("event",event.target.value); 
    
  }
  render () {
    const { submitForm } = this
    return(
    <div>
      <center>
       
          <h1>{this.state.edit ==='true'?'EDIT YOUR PROJECT':'ADD YOUR PROJECT'}</h1>
          <form onSubmit={submitForm}>
            title:<input type="text" name="title" className="input input1" value={this.state.title} onChange={this.handleTitleChange}/>
            <br />
            <br />
            Deadline:<input type="date" name="deadline" className="input input1" name="deadline" min="2017-04-01" max="2020-04-30" value={this.state.deadline} onChange={this.handleDeadlineChange}/>
            <br/>
            <br/>
            <button type="submit" className="button button1">{this.state.edit===false ? 'Add Project': 'Edit Project'}</button>
          </form>
        </center>
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addProject: (inputObj) => dispatch( addProject(inputObj) ),
  editProject:(inputObj) => dispatch(editProject(inputObj))
})
const mapStateToProps = (state) => ({
  
})
export default connect(mapStateToProps , mapDispatchToProps)(Project) ;