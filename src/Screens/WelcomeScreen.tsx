import { useEffect } from "react";
import { StyleSheet, Image, ImageBackground, StatusBar, View } from "react-native";
import * as Animatable from "react-native-animatable";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { getAccessTokenAsync, hydrateSession } from "../services/session";

const WelcomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    let isMounted = true;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const bootstrapSession = async () => {
      try {
        await hydrateSession();
        const accessToken = await getAccessTokenAsync();

        if (!isMounted) return;

        timer = setTimeout(() => {
          if (!isMounted) return;

          navigation.replace(
            accessToken ? "AppServiceBottomNavigation" : "Login",
          );
        }, 3500);
      } catch {
        if (!isMounted) return;

        timer = setTimeout(() => {
          if (!isMounted) return;
          navigation.replace("Login");
        }, 3500);
      }
    };

    void bootstrapSession();

    return () => {
      isMounted = false;

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [navigation]);

  return (
    <ImageBackground
      source={require("../../assets/with purple Sprinkles.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.overlay} />
      
      <Animatable.View
        animation="zoomIn"
        duration={2500}
        delay={400}
        easing="ease-out-expo"
        useNativeDriver
        style={styles.logoWrapper}
      >
        <Image
          source={require("../../assets/logo.jpg.jpeg")}
          style={styles.image}
          resizeMode="contain"
        />
      </Animatable.View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Fallback
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.35)", // Subtle dark tint to make logo pop
  },
  logoWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 20,
    backgroundColor: "transparent", // Change to #fff if logo is transparent
    borderRadius: moderateScale(20),
    overflow: "hidden",
  },
  image: {
    width: responsiveWidth(45),
    height: responsiveWidth(45),
    borderRadius: moderateScale(20), // Adds a nice rounded look to the logo square
  },
});
