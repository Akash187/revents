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
      let users = state.users;
      users[action.user.id] = action.user;
      return{
        ...state,
        events,
        users
      };
    case 'UPDATE_STORE_USERS':
      let tempUsers = state.users;
      tempUsers[action.user.id] = action.user;
      return{
        ...state,
        users : tempUsers
      };
    default:
      return state;
  }
};

export default eventReducer;