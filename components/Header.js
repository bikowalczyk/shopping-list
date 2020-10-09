import * as React from "react";
import { Header } from "react-native-elements";

export default function ({ title, navigation }) {
  return (
    <Header
      leftComponent={{
        icon: "menu",
        color: "#fff",
        onPress: () => navigation.toggleDrawer(),
      }}
      centerComponent={{ text: title, style: { color: "#fff" } }}
      //   rightComponent={{ icon: "home", color: "#fff" }}
    />
  );
}
