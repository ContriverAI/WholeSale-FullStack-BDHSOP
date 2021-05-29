const initState = {
  userToken: "",
  userLoggedIn: false,
  profile: {},
  items: [],
  cart: [],
};
const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case "USE-EFFECT-USER":
      return {
        ...state,
        userToken: localStorage.getItem("BDshopUser")
          ? localStorage.getItem("BDshopUser")
          : "",
        userLoggedIn: true,
        profile: localStorage.getItem("BDshopUserProfile")
          ? JSON.parse(localStorage.getItem("BDshopUserProfile"))
          : {},
      };
    case "LOGGED-IN":
      return {
        ...state,
        userToken: action.payload.token,
        profile: action.payload.profile,
        userLoggedIn: true,
      };
    case "LOGGED-OUT":
      return {
        ...state,
        userLoggedIn: false,
        userToken: "",
        profile: {},
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
