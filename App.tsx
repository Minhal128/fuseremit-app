import { useFonts } from "expo-font";
import { Provider as PaperProvider, MD3LightTheme, configureFonts } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";
import StripeWrapper from "./src/Components/Common/StripeWrapper";
import { LanguageProvider } from "./src/context/LanguageContext";
import Fonts from "./src/constants/Fonts";

const fontConfig = {
  displayLarge: { fontFamily: Fonts.extraBold },
  displayMedium: { fontFamily: Fonts.bold },
  displaySmall: { fontFamily: Fonts.semiBold },
  headlineLarge: { fontFamily: Fonts.bold },
  headlineMedium: { fontFamily: Fonts.semiBold },
  headlineSmall: { fontFamily: Fonts.medium },
  titleLarge: { fontFamily: Fonts.semiBold },
  titleMedium: { fontFamily: Fonts.medium },
  titleSmall: { fontFamily: Fonts.regular },
  labelLarge: { fontFamily: Fonts.medium },
  labelMedium: { fontFamily: Fonts.regular },
  labelSmall: { fontFamily: Fonts.regular },
  bodyLarge: { fontFamily: Fonts.regular },
  bodyMedium: { fontFamily: Fonts.regular },
  bodySmall: { fontFamily: Fonts.regular },
};

const theme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: fontConfig }),
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "Manrope-Regular": require("./assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Medium": require("./assets/fonts/Manrope-Medium.ttf"),
    "Manrope-SemiBold": require("./assets/fonts/Manrope-SemiBold.ttf"),
    "Manrope-Bold": require("./assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("./assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-Light": require("./assets/fonts/Manrope-Light.ttf"),
    "Manrope-ExtraLight": require("./assets/fonts/Manrope-ExtraLight.ttf"),
    "KronaOne-Regular": require("./assets/fonts/KronaOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LanguageProvider>
      <PaperProvider theme={theme}>
        <StripeWrapper>
          <AppNavigator />
        </StripeWrapper>
      </PaperProvider>
    </LanguageProvider>
  );
}
