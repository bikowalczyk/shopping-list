import { listTypes } from "../actions/types";
import { v4 as uuidv4 } from "uuid";

export const addList = (name) => (dispatch) => {
  const list = { name, createdAt: Date.now(), id: uuidv4(), items: [] };

  dispatch({
    type: listTypes.ADD_LIST,
    payload: list,
  });
};

export const removeList = (id) => (dispatch) => {
  dispatch({
    type: listTypes.REMOVE_LIST,
    payload: id,
  });
};
export const addItem = (value, id) => (dispatch) => {
  const item = { name: value, createdAt: Date.now(), id: uuidv4() };

  dispatch({
    type: listTypes.ADD_ITEM,
    payload: {
      item,
      id,
    },
  });
};
export const removeItem = (id) => (dispatch) => {
  dispatch({
    type: listTypes.REMOVE_ITEM,
    payload: id,
  });
};
