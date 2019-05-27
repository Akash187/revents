const initState = {
  err: null
};

const eventReducer = (state = initState, action) => {
  switch(action.type){
    case 'ADD_CLIENT':
      return{
        ...state,
        err: null
      };
    case 'ADD_EVENT_ERROR':
      return{
        ...state,
        err: action.err
      };
    default:
      return state;
  }
};

export default eventReducer;