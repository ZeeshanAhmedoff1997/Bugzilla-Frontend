const initialState = {
    fetching: false,
    title: null,
    deadline: null,
    type:null,
    imageUrl:null,
    status:null
  };
  
  const item = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_BUG_REQUEST': {
        return {
          fetching: true
        };
      }
      case 'ADD_ITEM_SUCCESS': {
        return {
          ...initialState,
          fetching: false,
          ...action.payload
        };
      }
      case 'ADD_ITEM_FAILED': {
        return {
          ...state,
          fetching: false
        };
      }
      case 'DELETE_ITEM_SUCCESS': {
        return {
          fetching: false,
          ...state,
        };
      }
      case 'DELETE_ITEM_FAILED': {
        return {
          fetching: false,
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default item;
  