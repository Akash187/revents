const initState = {
  unprotectedPrevRoute: '/dashboard',
  protectedPrevRoute: ''
};

const routeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_PREV_PROTECTED_ROUTE':
      return {
        ...state,
        protectedPrevRoute: action.route
      };
    case 'UPDATE_PREV_UNPROTECTED_ROUTE':
      return {
        ...state,
        unprotectedPrevRoute: action.route
      };
    default:
      return state;
  }
};

export default routeReducer;