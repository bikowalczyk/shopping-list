import { listTypes } from "../actions/types";

const initialState = {
  activeLists: [
    {
      name: "Groceries",
      id: "qweqwhwef",
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

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case listTypes.ADD_LIST:
      return {
        ...state,
        activeLists: [...state.activeLists, payload],
      };
    case listTypes.REMOVE_LIST:
      return {
        ...state,
        activeLists: state.activeLists.filter((x) => x.id !== payload),
        archivedLists: state.archivedLists.filter((x) => x.id !== payload),
      };
    case listTypes.EDIT_LIST:
      return {
        ...state,
        activeLists: state.activeLists.map((x) => {
          return x.id === payload.id ? payload : x;
        }),
      };
    case listTypes.ARCHIVE_LIST:
      if (payload.val) {
        return {
          ...state,
          activeLists: state.activeLists.filter((x) => {
            return x.id !== payload.list.id;
          }),
          archivedLists: [...state.archivedLists, payload.list],
        };
      }

    default:
      return state;
  }
};
