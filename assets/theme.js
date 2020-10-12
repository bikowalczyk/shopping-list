import { colors } from "react-native-elements";

export const theme = {
  SearchBar: {
    lightTheme: true,
    containerStyle: {
      width: "100%",
      alignSelf: "center",
    },
    // round: true,
  },
  ListItem: {
    containerStyle: {
      height: 55,
    },
  },
  Overlay: {
    overlayStyle: {
      width: "80%",
      padding: 15,
    },
  },
  Button: {
    buttonStyle: {
      minWidth: 70,
    },
  },
  ModalTitle: {
    fontWeight: "500",
    fontSize: 20,
  },
  ListItem: {
    // marginVertical: 5,
  },
  ItemList: {
    flexDirection: "row",
    alignItems: "center",
    // width: "95%",
    alignSelf: "center",
  },
  ItemListNumber: {
    // marginTop: 8,
  },
  ItemListInputContainer: {
    maxHeight: 40,
    width: "100%",
    padding: 0,
    margin: 0,
    marginRight: 3,
    borderStyle: "dotted",
  },
  ItemListInput: {
    fontSize: 17,
    marginBottom: -5,
    paddingHorizontal: "10%",
    paddingRight: "13%",
    width: "100%",
  },
  // itemsContainer: {
  //   marginVertical: 20,
  // },
  qaContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  swipeButton: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  textStrikethrough: {
    textDecorationLine: "line-through",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.white,
  },
  swipeButtonPressable: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
};
