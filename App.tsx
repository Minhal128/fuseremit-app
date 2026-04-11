import { useFonts } from "expo-font";
import { Provider as PaperProvider } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";
import StripeWrapper from "./src/Components/Common/StripeWrapper";
import { LanguageProvider } from "./src/context/LanguageContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Manrope-Regular": require("./assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Medium": require("./assets/fonts/Manrope-Medium.ttf"),
    "Manrope-SemiBold": require("./assets/fonts/Manrope-SemiBold.ttf"),
    "Manrope-Bold": require("./assets/fonts/Manrope-Bold.ttf"),
    "KronaOne-Regular": require("./assets/fonts/KronaOne-Regular.ttf"),
  });

  return (
    <LanguageProvider>
      <PaperProvider>
        <StripeWrapper>
          <AppNavigator />
        </StripeWrapper>
      </PaperProvider>
    </LanguageProvider>
  );
}
