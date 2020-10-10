import { listTypes } from "../actions/types";

const initialState = {
  activeLists: [
    {
      name: "Groceries",
      key: "qweqwhwef",
    },
    {
      name: "Car",
      key: "ewqeqw",
    },
    {
      name: "Household",
      key: "cvbcvb",
    },
  ],
  archivedLists: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case listTypes.ADD_LIST:
      return {
        ...state,
        activeLists: activeLists.push(payload),
      };
    default:
      return state;
  }
};
