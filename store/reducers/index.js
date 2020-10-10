import { combineReducers } from "redux";
import ListReducer from "./listReducer";

export default combineReducers({
  lists: ListReducer,
});
