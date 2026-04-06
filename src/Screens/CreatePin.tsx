import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { moderateScale } from "react-native-size-matters";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import PinSuccessModal from "../Components/Login/PinSuccessModal";
import { createPin } from "../services/authApi";
import { getAccessTokenAsync, markPinCreated } from "../services/session";

interface Props {
  navigation: any;
}

const CreatePin = ({ navigation }: Props) => {
  const [pin, setPin] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [helperMessage, setHelperMessage] = useState<string>("");

  const submitPin = useCallback(async (pinValue: string) => {
    const accessToken = await getAccessTokenAsync();

    if (!accessToken) {
      navigation.navigate("Login");
      return;
    }

    try {
      setErrorMessage("");
      setIsSubmitting(true);

      await createPin({ pin: pinValue }, accessToken);
      markPinCreated();
      setModalVisible(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to create PIN right now.";

      setErrorMessage(message);
      setPin("");
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const handlePress = (num: string) => {
    if (isSubmitting) return;

    setHelperMessage("");

    setPin((prev) => {
      if (prev.length >= 6) {
        return prev;
      }

      const next = `${prev}${num}`;

      if (next.length === 6) {
        void submitPin(next);
      }

      return next;
    });
  };

  const handleDelete = () => {
    if (isSubmitting) return;
    setHelperMessage("");
    setPin((prev) => prev.slice(0, -1));
  };

  const handleBiometricPress = () => {
    void (async () => {
      setErrorMessage("");

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        setHelperMessage("No fingerprint enrolled on this device.");
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Verify your fingerprint",
        fallbackLabel: "Use PIN",
      });

      if (result.success) {
        setHelperMessage("Fingerprint verified. Continue entering your PIN.");
      }
    })();
  };

  const renderDot = (index: number) => {
    const filled = index < pin.length;

    return (
      <View
        key={index}
        style={[
          styles.dot,
          {
            backgroundColor: filled ? "#22C55E" : "#E5E7EB",
          },
        ]}
      />
    );
  };

  const NumberButton = ({ value }: { value: string }) => (
    <Pressable
      style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}
      onPressIn={() => handlePress(value)}
    >
      <Text style={styles.keyText}>{value}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={moderateScale(22)} />
        </TouchableOpacity>

        <Image
          source={require("../../assets/login.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={{ width: moderateScale(24) }} />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Create your Pin</Text>
        <Text style={styles.subtitle}>Please confirm your PIN</Text>
      </View>

      <View style={styles.dotsContainer}>
        {[0, 1, 2, 3, 4, 5].map(renderDot)}
      </View>

      <View style={styles.keypadContainer}>
        {isSubmitting ? (
          <View style={styles.submittingState}>
            <ActivityIndicator color="#0B3963" />
            <Text style={styles.submittingText}>Saving your PIN...</Text>
          </View>
        ) : null}

        <View style={styles.row}>
          <NumberButton value="1" />
          <NumberButton value="2" />
          <NumberButton value="3" />
        </View>

        <View style={styles.row}>
          <NumberButton value="4" />
          <NumberButton value="5" />
          <NumberButton value="6" />
        </View>

        <View style={styles.row}>
          <NumberButton value="7" />
          <NumberButton value="8" />
          <NumberButton value="9" />
        </View>

        <View style={styles.row}>
          <Pressable
            style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}
            onPress={handleBiometricPress}
          >
            <Ionicons
              name="finger-print-outline"
              size={moderateScale(28)}
              color="#000"
            />
          </Pressable>

          <NumberButton value="0" />

          <Pressable
            style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}
            onPressIn={handleDelete}
          >
            <Ionicons
              name="backspace-outline"
              size={moderateScale(26)}
              color="#000"
            />
          </Pressable>
        </View>
      </View>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      {!errorMessage && helperMessage ? (
        <Text style={styles.helperText}>{helperMessage}</Text>
      ) : null}

      <View style={styles.footer}>
        <Text style={styles.forgot}>Forgot your PIN?</Text>
        <Text style={styles.logout}>Logout</Text>
      </View>

      {/* Modal */}
      <PinSuccessModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default CreatePin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(6),
  },

  logo: {
    width: responsiveWidth(50),
    height: responsiveHeight(5),
  },

  header: {
    marginTop: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(6),
  },

  title: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: "Manrope-SemiBold",
    color: "#000",
  },

  subtitle: {
    fontSize: responsiveFontSize(1.3),
    color: "#6B7280",
    marginTop: responsiveHeight(0.7),
    fontFamily: "Manrope-SemiBold",
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: responsiveHeight(6),
  },

  dot: {
    width: moderateScale(18),
    height: moderateScale(18),
    borderRadius: moderateScale(50),
    marginHorizontal: moderateScale(10),
  },

  keypadContainer: {
    marginTop: responsiveHeight(7),
  },

  submittingState: {
    alignItems: "center",
    marginBottom: responsiveHeight(2),
  },

  submittingText: {
    marginTop: responsiveHeight(1),
    color: "#0B3963",
    fontFamily: "Manrope-SemiBold",
    fontSize: responsiveFontSize(1.5),
  },

  errorText: {
    marginTop: responsiveHeight(1),
    textAlign: "center",
    color: "#FB002E",
    fontFamily: "Manrope-SemiBold",
    fontSize: responsiveFontSize(1.4),
  },

  helperText: {
    marginTop: responsiveHeight(1),
    textAlign: "center",
    color: "#0B3963",
    fontFamily: "Manrope-SemiBold",
    fontSize: responsiveFontSize(1.35),
    paddingHorizontal: responsiveWidth(8),
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: responsiveHeight(3),
  },

  key: {
    width: responsiveWidth(22),
    height: responsiveWidth(10),
    justifyContent: "center",
    alignItems: "center",
  },

  keyPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.7,
  },

  keyText: {
    fontSize: responsiveFontSize(3.5),
    color: "#000",
    fontFamily: "Manrope-Bold",
  },

  footer: {
    position: "absolute",
    bottom: responsiveHeight(8),
    left: responsiveWidth(6),
    right: responsiveWidth(6),
    flexDirection: "row",
    justifyContent: "space-between",
  },

  forgot: {
    color: "#27AE60",
    fontSize: responsiveFontSize(1.6),
    fontFamily: "Manrope-SemiBold",
  },

  logout: {
    color: "#FB002E",
    fontSize: responsiveFontSize(1.6),
    fontFamily: "Manrope-SemiBold",
  },
});
