import { listTypes } from "../actions/types";

const initialState = {
  activeLists: [
    {
      name: "Groceries",
      id: "qweqwhwef",
      items: [],
    },
    {
      name: "Car",
      id: "ewqeqw",
      items: [],
    },
    {
      name: "Household",
      id: "cvbcvb",
      items: [],
    },
  ],
  archivedLists: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case listTypes.ADD_LIST:
      return {
        ...state,
        activeLists: [...state.activeLists, action.payload],
      };
    case listTypes.REMOVE_LIST:
      return {
        ...state,
        activeLists: state.activeLists.filter((x) => x.id !== action.payload),
      };
    default:
      return state;
  }
};
