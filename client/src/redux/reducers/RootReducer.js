import { combineReducers } from "redux";
import AdminReducer from "./AdminReducer";
import UserReducer from "./UserReducer";

const RootReducer = combineReducers({
  Admin: AdminReducer,
  User: UserReducer,
});
export default RootReducer;
