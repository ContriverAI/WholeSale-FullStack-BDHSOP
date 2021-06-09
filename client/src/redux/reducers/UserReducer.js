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
        cart: localStorage.getItem("BDshopCart")
          ? JSON.parse(localStorage.getItem("BDshopCart"))
          : [],
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
      localStorage.setItem(
        "BDshopCart",
        JSON.stringify([...state.cart, action.payload])
      );
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE-FROM-CART":
      localStorage.setItem(
        "BDshopCart",
        JSON.stringify(
          state.cart.filter(
            (item) => item._id.toString() !== action.payload.toString()
          )
        )
      );
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item._id.toString() !== action.payload.toString()
        ),
      };
    case "EMPTY-CART":
      localStorage.setItem("BDshopCart", JSON.stringify([]));
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default UserReducer;
