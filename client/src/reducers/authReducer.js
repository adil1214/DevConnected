const authReducerDefaultState = {
  isAuthnticated: false,
  users: {}
} 

export default (state = authReducerDefaultState, action) => {
  switch (action.type) {
    case '':
      return ;
    default:
      return state;
  }
}