const initState = {
  userToken: "",
  userLoggedIn: false,
};
const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGGED-IN":
      console.log(action);
      return {
        ...state,
        userToken: action.payload,
        userLoggedIn: true,
      };
    default:
      return state;
  }
};

export default UserReducer;
