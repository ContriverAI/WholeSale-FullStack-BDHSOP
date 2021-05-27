const initState = {
  userToken: "",
  userLoggedIn: false,
  items: [],
  cart: [],
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
    case "ADD-TO-CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE-FROM-CART":
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item._id.toString() !== action.payload.toString()
        ),
      };
    default:
      return state;
  }
};

export default UserReducer;
