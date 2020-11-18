import { listTypes } from "../actions/types";
import uuid from "react-native-uuid";

export const addList = (name) => (dispatch) => {
  const list = { name, createdAt: Date.now(), id: uuid.v1(), items: [] };

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
export const editList = (data) => (dispatch) => {
  dispatch({
    type: listTypes.EDIT_LIST,
    payload: data,
  });
};
export const archiveList = (list, val) => (dispatch) => {
  dispatch({
    type: listTypes.ARCHIVE_LIST,
    payload: { list, val },
  });
};
