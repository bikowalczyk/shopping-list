import { combineReducers } from "redux";
import listReducer from "./listReducer";
import itemReducer from "./itemReducer";

export default combineReducers({
  lists: listReducer,
  items: itemReducer,
});
