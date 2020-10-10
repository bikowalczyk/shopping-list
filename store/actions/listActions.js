import { listTypes } from "../actions/types";
import { v4 as uuidv4 } from "uuid";

export const addList = (data) => (dispatch) => {
  const list = { ...data, createdAt: Date.now(), key: uuidv4() };

  dispatch({
    type: listTypes.ADD_LIST,
    payload: list,
  });
};
