import { itemTypes } from "../actions/types";
import { v4 as uuidv4 } from "uuid";

export const addItem = (value, id) => (dispatch) => {
  const item = { name: value, createdAt: Date.now(), id: uuidv4(), list: id };

  dispatch({
    type: itemTypes.ADD_ITEM,
    payload: item,
  });
};

export const removeItem = (id) => (dispatch) => {
  dispatch({
    type: itemTypes.REMOVE_ITEM,
    payload: id,
  });
};

export const editItem = (item) => (dispatch) => {
  dispatch({
    type: itemTypes.EDIT_ITEM,
    payload: item,
  });
};
