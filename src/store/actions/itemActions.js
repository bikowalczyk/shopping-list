import { itemTypes } from "../actions/types";
import uuid from "react-native-uuid";

export const addItem = (value, id) => (dispatch) => {
  const item = { name: value, createdAt: Date.now(), id: uuid.v1(), list: id };

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
