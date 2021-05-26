import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "../reducers/RootReducer";

const Store = createStore(RootReducer, composeWithDevTools());

export default Store;
