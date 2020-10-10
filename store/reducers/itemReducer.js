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
    // case listTypes.ADD_ITEM:
    //   console.log(
    //     state.activeLists.filter((x) => x.id === action.payload.id)[0].items
    //   );
    //   return {
    //     ...state,
    //     activeLists: [
    //       ...state.activeLists,
    //       {
    //         ...state.activeLists.filter((x) => x.id === action.payload.id)[0]
    //           .items,
    //         ...action.payload.item,
    //       },
    //     ],
    //   };
    default:
      return state;
  }
};
