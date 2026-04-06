import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const VerificationProgressScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const progress = useRef(new Animated.Value(0)).current;
  const [completed, setCompleted] = useState(false);

  const size = responsiveWidth(50);
  const strokeWidth = moderateScale(14);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => {
      setCompleted(true);
    });
  }, []);

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Verify it’s you</Text>
      </View>

      <View style={styles.loaderWrapper}>
        <Svg width={size} height={size}>
          <Circle
            stroke="#E2E6EC"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />

          <AnimatedCircle
            stroke="#000"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            originX={size / 2}
            originY={size / 2}
          />
        </Svg>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {completed ? "Verification Complete" : "Verification in Progress"}
        </Text>

        <Text style={styles.subtitle}>
          Your identity is being verified. You’ll have full access to all
          FuseRemit features as soon as the process is complete.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AppServiceBottomNavigation')}>
        <Text style={styles.buttonText}>Go to Dashboard</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default VerificationProgressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
    alignItems: "center",
  },

  header: {
    width: "100%",
    alignItems: "center",
    marginTop: responsiveHeight(2),
  },

  headerTitle: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: "600",
    color: "#000",
  },

  loaderWrapper: {
    marginTop: responsiveHeight(8),
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    width: responsiveWidth(85),
    alignItems: "center",
    marginTop: responsiveHeight(6),
  },

  title: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: "600",
    color: "#000",
    marginBottom: responsiveHeight(1.5),
    textAlign: "center",
  },

  subtitle: {
    fontSize: responsiveFontSize(1.8),
    color: "#555",
    textAlign: "center",
    lineHeight: moderateScale(22),
  },

  button: {
    position: "absolute",
    bottom: responsiveHeight(4),
    width: responsiveWidth(85),
    height: responsiveHeight(7),
    backgroundColor: "#123B67",
    borderRadius: moderateScale(12),
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: responsiveFontSize(2),
    fontWeight: "600",
  },
});
