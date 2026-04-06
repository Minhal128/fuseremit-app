import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

const PREVIEW_WIDTH = responsiveWidth(60);
const PREVIEW_HEIGHT = responsiveHeight(45);

const VerifyItsYouScreen = () => {
  const navigation = useNavigation<any>();
  const cameraRef = useRef<any>(null);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <Text>Camera permission required</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={moderateScale(20)} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Verify it’s you</Text>
        <View style={{ width: moderateScale(20) }} />
      </View>

      <View style={styles.previewWrapper}>
        <View style={styles.cameraOuter}>
          <CameraView ref={cameraRef} style={styles.camera} facing="front" />
        </View>

        <View style={styles.borderWrapper} pointerEvents="none">
          <View style={styles.faceBorder} />
        </View>
      </View>

      <Text style={styles.instruction}>
        Please align your face within the frame
      </Text>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.replace("VerificationProgress")}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default VerifyItsYouScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(4),
    paddingTop: responsiveHeight(2),
  },
  headerTitle: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: "Manrope-Bold",
    color: "#000",
  },

  previewWrapper: {
    width: PREVIEW_WIDTH,
    height: PREVIEW_HEIGHT,
    marginTop: responsiveHeight(4),
    justifyContent: "center",
    alignItems: "center",
  },

  cameraOuter: {
    width: PREVIEW_WIDTH,
    height: PREVIEW_HEIGHT,
    borderRadius: PREVIEW_WIDTH / 2,
    overflow: "hidden",
  },

  camera: {
    width: "100%",
    height: "100%",
  },

  borderWrapper: {
    position: "absolute",
    width: PREVIEW_WIDTH,
    height: PREVIEW_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },

  faceBorder: {
    width: PREVIEW_WIDTH,
    height: PREVIEW_HEIGHT,
    borderRadius: PREVIEW_WIDTH / 2,
    borderWidth: moderateScale(3),
    borderColor: "#CFF7E2",
  },

  instruction: {
    marginTop: responsiveHeight(4),
    fontSize: responsiveFontSize(1.8),
    color: "#555",
    fontFamily: "Manrope-SemiBold",
    textAlign: "center",
  },

  nextButton: {
    position: "absolute",
    bottom: responsiveHeight(6),
    width: responsiveWidth(85),
    height: responsiveHeight(6.5),
    backgroundColor: "#0B3963",
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: responsiveFontSize(2),
    fontFamily: "Manrope-Bold",
  },
});
