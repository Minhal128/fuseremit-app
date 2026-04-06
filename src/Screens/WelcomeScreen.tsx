import { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
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
        }, 1200);
      } catch {
        if (!isMounted) return;

        timer = setTimeout(() => {
          if (!isMounted) return;
          navigation.replace("Login");
        }, 1200);
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
    <View style={styles.container}>
      <Animatable.View
        animation="fadeIn"
        duration={2000}
        delay={300}
        easing="ease-out-cubic"
        useNativeDriver
      >
        <Image
          source={require("../../assets/welcome.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </Animatable.View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: responsiveWidth(70),
    height: responsiveHeight(30),
    marginBottom: moderateScale(10),
  },
});
