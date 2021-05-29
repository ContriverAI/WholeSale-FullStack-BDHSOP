const initState = {
  adminToken: "",
  adminLoggedIn: false,
};
const AdminReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADMIN-LOGGED-IN":
      console.log(action);
      return {
        ...state,
        adminToken: action.payload,
        adminLoggedIn: true,
      };
    case "ADMIN-LOGGED-OUT":
      return {
        ...state,
        adminLoggedIn: false,
        adminToken: "",
      };
    default:
      return state;
  }
};

export default AdminReducer;
