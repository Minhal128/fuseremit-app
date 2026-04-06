import { useFonts } from "expo-font";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Manrope-Regular": require("./assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Medium": require("./assets/fonts/Manrope-Medium.ttf"),
    "Manrope-SemiBold": require("./assets/fonts/Manrope-SemiBold.ttf"),
    "Manrope-Bold": require("./assets/fonts/Manrope-Bold.ttf"),
    "KronaOne-Regular": require("./assets/fonts/KronaOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return <AppNavigator />;
}
