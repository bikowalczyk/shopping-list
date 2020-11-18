import React, { useContext } from "react";
import { Header, Icon, ThemeContext } from "react-native-elements";
import { TouchableOpacity } from "react-native";

export default function ({ title, navigation, route, back }) {
  const { theme } = useContext(ThemeContext);
  return (
    <Header
      leftComponent={
        <TouchableOpacity
          onPress={() =>
            back ? navigation.goBack() : navigation.toggleDrawer()
          }
        >
          <Icon
            name={back ? "arrow-back" : "menu"}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      }
      centerComponent={{
        text: title || route.params.routeName,
        style: theme.headerTitle,
      }}
      rightComponent={
        !back && route.name !== "Archived Lists" ? (
          <TouchableOpacity onPress={() => route.params.handleOverlay()}>
            <Icon name="add" color={theme.colors.white} />
          </TouchableOpacity>
        ) : null
      }
    />
  );
}
