export const updatePrevProtectedRoute = (route) => {
  return{
    type: 'UPDATE_PREV_PROTECTED_ROUTE',
    route
  }
};

export const updatePrevUnProtectedRoute = (route) => {
  return{
    type: 'UPDATE_PREV_UNPROTECTED_ROUTE',
    route
  }
};