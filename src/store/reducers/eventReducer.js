const initState = {
  err: null,
  events: [],
  users: {},
  haveMoreEvent: true,
  lastDocSnapshot: {}
};

const eventReducer = (state = initState, action) => {
  switch(action.type){
    case 'ADD_EVENT':
      return{
        ...state,
        err: null
      };
    case 'ADD_EVENT_ERROR':
      return{
        ...state,
        err: action.err
      };
    case 'STORE_EVENTS_AND_USERS':
      return{
        ...state,
        events: action.events,
        users: action.users,
        haveMoreEvent: action.haveMoreEvent,
        lastDocSnapshot: action.lastDocSnapshot
      };
    case 'UPDATE_STORE_EVENTS_AND_USERS':
      let events = [];
      state.events.forEach(event => {
        if(event.id !== action.event.id){
          events.push(event);
        }else{
          events.push(action.event);
        }
      });
      let users = {...state.users, ...action.users};
      return{
        ...state,
        events,
        users
      };
    default:
      return state;
  }
};

export default eventReducer;