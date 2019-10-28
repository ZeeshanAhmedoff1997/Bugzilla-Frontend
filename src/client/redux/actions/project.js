import axios from 'axios';
import {withRouter} from 'react-router-dom';
export const addProject = ({title,deadline,manager_id}) => (dispatch) => {
    console.log('add Project action',title,deadline,manager_id)
    dispatch({ type: 'ADD_BUG_REQUEST' });
    let config = {
        headers: {
          'access-token': localStorage.getItem('access-token'),
          'uid': localStorage.getItem('uid'),
          'token-type':  localStorage.getItem('token-type'),
          'client': localStorage.getItem('client')
        }
      }
      const data={
        title,
        deadline,
        manager_id,
      }
     const url = 'http://localhost:3001/api/v1/projects';
     return axios.post(url,data,config).then(( data ) => {
      this.props.history.push('/home');
    }).catch((error) => {

    });
  };
  export const editProject = ({title,deadline,manager_id,project_id}) => (dispatch) => {
    console.log('edit Project action',title,deadline,manager_id,project_id)
    //dispatch({ type: 'ADD_BUG_REQUEST' });
    let config = {
        headers: {
          'access-token': localStorage.getItem('access-token'),
          'uid': localStorage.getItem('uid'),
          'token-type':  localStorage.getItem('token-type'),
          'client': localStorage.getItem('client')
        }
      }
      const data={
        title,
        deadline,
        manager_id,
        project_id,
      }
     const url = 'http://localhost:3001/api/v1/projects/'+project_id;
     return axios.put(url,data,config).then(( data ) => { 
      localStorage.removeItem('project_id');
      alert('PROJECT HAS BEEN EDITIED');
      // this.props.history.push('/home');
      //console.log('data is',JSON.parse(data.config.data));
      // const item=JSON.parse(data.config.data);
       return dispatch({ type: 'EDIT_PROJECT_SUCCESS'/*, payload: item*/ });
    }).catch((error) => {
     // alert('ERROR!!!!!');
      // const { item } = error.response;
      dispatch({ type: 'EDIT_PROJECT_FAILED' });
    });
  };
  export const deleteProject = (project_id) => (dispatch) => {
    console.log('delete Project action',project_id)
    //dispatch({ type: 'ADD_BUG_REQUEST' });
    let config = {
        headers: {
          'access-token': localStorage.getItem('access-token'),
          'uid': localStorage.getItem('uid'),
          'token-type':  localStorage.getItem('token-type'),
          'client': localStorage.getItem('client')
        }
      }
      const data={
        project_id,
      }
     const url = 'http://localhost:3001/api/v1/projects/'+project_id;
     return axios.delete(url,data,config).then(( data ) => {
      // console.log('data is',JSON.parse(data.config.data));
      //  const item=JSON.parse(data.config.data);
      this.props.history.push('/home');

      //  return dispatch({ type: 'DELETE_PROJECT_SUCCESS', /*payload: item*/ });
    }).catch((error) => {
      // const { item } = error.response;
      // dispatch({ type: 'DELETE_PROJECT_FAILED' });
    });
  };