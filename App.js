import React from "react";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import { Ionicons } from "@expo/vector-icons";
import RootNavigation from "./navigation/RootNavigation";
import { ThemeProvider } from "react-native-elements";

export default function App() {
  // const [isReady, setIsReady] = useState(false);
  const [isLoaded] = useFonts({
    // Roboto: require("native-base/Fonts/Roboto.ttf"),
    // Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    ...Ionicons.font,
  });

  !isLoaded && <AppLoading />;

  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>
  );
}
