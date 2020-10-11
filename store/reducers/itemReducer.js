import { itemTypes } from "../actions/types";

const initialState = {
  items: [{ name: "Apples", qty: 4, id: "wfowekl", list: "qweqwhwef" }],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case itemTypes.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case itemTypes.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((x) => x.id !== action.payload),
      };

    default:
      return state;
  }
};
