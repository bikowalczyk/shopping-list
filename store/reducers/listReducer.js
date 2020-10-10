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
