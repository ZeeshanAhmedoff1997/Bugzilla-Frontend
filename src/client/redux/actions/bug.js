import axios from 'axios';
export const addBug = ({title,deadline,bugType,image,status,project_id}) => (dispatch) => {
    console.log('add Bug action',title,deadline,bugType,image,status,project_id)
    const qa_id=localStorage.getItem('uid');
    dispatch({ type: 'ADD_BUG_REQUEST' });
    let config = {
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'uid': localStorage.getItem('uid'),
        'token-type':  localStorage.getItem('uid'),
        'client': localStorage.getItem('client')
      }
    }
    const data = {
      title,
      deadline,
      bugType,
      image,
      status,
      project_id,
      qa_id
    }
     const url = 'http://localhost:3001/api/v1/projects/'+project_id+'/bugs';
     return axios.post(url,data,config).then(( data ) => {
      localStorage.removeItem('project_id');
      const bug=data.data;
      console.log('data',data.data);
      alert('bug is added to the project:',project_id);
      
      // console.log('data is',JSON.parse(data.config.data));
      //  const item=JSON.parse(data.config.data);
       return dispatch({ type: 'ADD_BUG_SUCCESS', payload: bug });
    }).catch((error) => {
      const { item } = error.response;
      dispatch({ type: 'ADD_BUG_FAILED' });
    });
  };
  export const assignBug = (project_id,bugId) => (dispatch) => {
    debugger;
    //console.log('add Bug action',title,deadline,bugType,image,status,project_id)
    const developer_id=localStorage.getItem('uid');
    dispatch({ type: 'ADD_BUG_REQUEST' });
    let config = {
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'uid': localStorage.getItem('uid'),
        'token-type':  localStorage.getItem('uid'),
        'client': localStorage.getItem('client')
      }
    }
    const data = {
      project_id,
      developer_id,
      bugId
    }
     const url = 'http://localhost:3001/api/v1/projects/'+project_id+'/bugs/'+bugId;
     return axios.put(url,data,config).then(( data ) => {
      localStorage.removeItem('project_id');
      const bug=data.data;
      console.log('data',data.data);
      alert('bug is Assigned to You');
      
      // console.log('data is',JSON.parse(data.config.data));
      //  const item=JSON.parse(data.config.data);
       return dispatch({ type: 'ASSIGN_BUG_SUCCESS', payload: bug });
    }).catch((error) => {
      const { item } = error.response;
      dispatch({ type: 'ASSIGN_BUG_FAILED' });
    });
  };