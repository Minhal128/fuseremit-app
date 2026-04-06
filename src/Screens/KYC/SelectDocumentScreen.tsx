import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Image,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { moderateScale } from "react-native-size-matters";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

const SelectDocumentScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const cameraRef = useRef<any>(null);

  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<"off" | "on">("off");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleCapture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      setCapturedPhoto(photo.uri);
      setIsCameraReady(true);
    } catch (error) {
      console.log("Capture error:", error);
      setCameraError("Failed to capture photo");
    }
  };

  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#000" }}>Camera permission is required.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={moderateScale(18)} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Take a picture of your ID card</Text>

        <View style={{ width: moderateScale(24) }} />
      </View>

      <View style={styles.cameraWrapper}>
        {cameraError ? (
          <View style={styles.center}>
            <Text style={{ color: "#f00" }}>{cameraError}</Text>
          </View>
        ) : capturedPhoto ? (
          <Image source={{ uri: capturedPhoto }} style={styles.camera} />
        ) : (
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="back"
            flash={flash}
            onCameraReady={() => setIsCameraReady(true)}
            onMountError={(error) => {
              console.error("Camera mount error:", error);
              setCameraError("Failed to start camera");
            }}
          />
        )}

        <View style={styles.overlayBox} />

        {!isCameraReady && !cameraError && !capturedPhoto && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          >
            <ActivityIndicator size="large" color="#0FA958" />
            <Text style={{ color: "#0FA958", marginTop: 10 }}>
              Loading Camera...
            </Text>
          </View>
        )}
      </View>

      <View style={styles.infoSection}>
        {capturedPhoto ? (
          <Text style={styles.capturedText}>
            Picture Saved, click nect to continue
          </Text>
        ) : (
          <>
            <Text style={styles.title}>Front of ID Card</Text>
            <Text style={styles.subtitle}>
              Ensure all 4 sides are visible and text is clear
            </Text>
          </>
        )}
      </View>

      <View style={styles.bottomControls}>
        {capturedPhoto ? (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => console.log("Next pressed")}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setFlash(flash === "off" ? "on" : "off")}
            >
              <Ionicons
                name={flash === "off" ? "flash-off" : "flash"}
                size={moderateScale(24)}
                color="#000"
              />
              <Text style={styles.iconText}>Flash</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleCapture}
              disabled={!isCameraReady || !!cameraError}
            >
              <FontAwesome name="camera" size={26} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => console.log("Help pressed")}
            >
              <MaterialCommunityIcons
                name="help-circle"
                size={moderateScale(24)}
                color="#000"
              />
              <Text style={styles.iconText}>Help</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SelectDocumentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: responsiveWidth(4),
    paddingTop: responsiveHeight(2),
  },
  headerTitle: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: "Manrope-Bold",
    color: "#000",
    textAlign: "center",
    flex: 1,
  },
  cameraWrapper: {
    alignSelf: "center",
    width: responsiveWidth(85),
    height: responsiveHeight(48),
    borderRadius: moderateScale(10),
    overflow: "hidden",
    marginTop: responsiveHeight(2),
  },
  camera: { flex: 1 },
  overlayBox: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderWidth: moderateScale(1),
    borderColor: "#0FA958",
    borderRadius: moderateScale(10),
  },
  infoSection: { alignItems: "center", marginTop: responsiveHeight(3) },
  title: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: "Manrope-SemiBold",
    color: "#000",
    textAlign: "center",
    width: responsiveWidth(80),
  },
  subtitle: {
    fontSize: responsiveFontSize(1.5),
    color: "#666",
    textAlign: "center",
    width: responsiveWidth(80),
    fontFamily: "Manrope-Bold",
  },
  capturedText: {
    fontSize: responsiveFontSize(1.6),
    color: "#1E1E1E",
    fontFamily: "Manrope-Bold",
    textAlign: "center",
  },
  bottomControls: {
    position: "absolute",
    bottom: responsiveHeight(5),
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconButton: { alignItems: "center" },
  iconText: {
    marginTop: responsiveHeight(0.5),
    fontSize: responsiveFontSize(1.4),
    color: "#000",
    fontFamily: "Manrope-SemiBold",
  },
  captureButton: {
    width: responsiveWidth(17),
    height: responsiveWidth(17),
    borderRadius: responsiveWidth(9),
    backgroundColor: "#1F2A44",
    justifyContent: "center",
    alignItems: "center",
  },
  nextButton: {
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
