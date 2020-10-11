import { itemTypes } from "../actions/types";

const initialState = {
  items: [
    { name: "Apples", qty: 4, id: "wfowekl", list: "qweqwhwef", done: true },
    { name: "Oranges", qty: 4, id: "ewq", list: "qweqwhwef", done: false },
  ],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case itemTypes.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, payload],
      };
    case itemTypes.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((x) => x.id !== payload),
      };
    case itemTypes.EDIT_ITEM:
      return {
        ...state,
        items: state.items.map((x) => {
          return x.id === payload.id ? payload : x;
        }),
      };

    default:
      return state;
  }
};
