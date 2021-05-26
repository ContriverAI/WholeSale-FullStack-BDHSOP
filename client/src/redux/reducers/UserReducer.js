const initState = {
  userToken: "",
  userLoggedIn: false,
  items: [],
};
const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGGED-IN":
      return {
        ...state,
        userToken: action.payload,
        userLoggedIn: true,
      };
    case "LOGGED-OUT":
      return {
        ...state,
        userLoggedIn: false,
        userToken: "",
      };
    case "GET-ITEMS":
      return {
        ...state,
        items: [action.payload],
      };
    default:
      return state;
  }
};

export default UserReducer;
