import React from "react";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import { registerRootComponent } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { ThemeProvider } from "react-native-elements";
import { Root } from "native-base";
import RootNavigator from "navigation/RootNavigator";
import store from "./store/index";

import { theme } from "../assets/theme";

function App() {
  // const [isReady, setIsReady] = useState(false);
  const [isLoaded] = useFonts({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    ...Ionicons.font,
  });

  !isLoaded && <AppLoading />;

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Root>
          <RootNavigator />
        </Root>
      </ThemeProvider>
    </Provider>
  );
}

export default registerRootComponent(App);
