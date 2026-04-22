import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale } from "react-native-size-matters";
import Fonts from "../../../constants/Fonts";

interface Props {
  navigation: any;
}

const OTP_LENGTH = 4;
const INITIAL_TIME = 60;

const OTPScreen = ({ navigation }: Props) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [seconds, setSeconds] = useState(INITIAL_TIME);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isFilled, setIsFilled] = useState(false);

  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (seconds === 0) return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const checkOtpFilled = (arr: string[]) => {
    const filled = arr.every((v) => v !== "");
    setIsFilled(filled);
  };

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < OTP_LENGTH - 1) {
      setActiveIndex(index + 1);
      inputs.current[index + 1]?.focus();
    }

    if (text && index === OTP_LENGTH - 1) {
      setActiveIndex(null);
    }

    checkOtpFilled(newOtp);
  };

  const handleFocus = (index: number) => {
    setActiveIndex(index);
  };

  const handleBackspace = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      setActiveIndex(index - 1);
      inputs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    if (isFilled) {
      console.log("OTP Entered:", otp.join(""));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View style={styles.topbar}>
          <Text style={styles.topTitle}>OTP / PIN</Text>
        </View>

        <Text style={styles.title}>Verify Your Phone Number</Text>
        <Text style={styles.subtitle}>
          Please enter the 4-digit code we sent to 080 **** **78.
        </Text>

        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              style={[styles.otpBox, activeIndex === index && styles.otpActive]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onFocus={() => handleFocus(index)}
              onChangeText={(t) => handleChange(t, index)}
              onKeyPress={({ nativeEvent }) =>
                handleBackspace(nativeEvent.key, index)
              }
            />
          ))}
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity
            style={[styles.continueBtn, isFilled && styles.continueActive]}
            disabled={!isFilled}
            onPress={() => navigation.navigate("Transaction")}
          >
            <Text
              style={[
                styles.continueText,
                isFilled && styles.continueTextActive,
              ]}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveHeight(6),
    backgroundColor: "#fff",
  },
  topbar: {
    alignItems: "center",
    justifyContent: "center",
  },
  topTitle: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: Fonts.semiBold,
  },
  title: {
    fontSize: responsiveFontSize(2.3),
    fontFamily: Fonts.semiBold,
    marginTop: responsiveHeight(2),
  },
  subtitle: {
    fontSize: responsiveFontSize(1.5),
    color: "#777",
    marginTop: moderateScale(6),
    fontFamily: Fonts.regular,
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: responsiveHeight(2),
  },
  otpBox: {
    width: responsiveWidth(19),
    height: responsiveWidth(19),
    borderRadius: moderateScale(10),
    textAlign: "center",
    fontSize: responsiveFontSize(2.2),
    backgroundColor: "#e5e5e569",
  },
  otpActive: {
    borderColor: "#FB002E",
    borderWidth: 1.5,
  },
  bottom: {
    position: "absolute",
    bottom: responsiveHeight(4),
    alignSelf: "center",
    alignItems: "center",
  },
  continueBtn: {
    width: responsiveWidth(88),
    height: responsiveHeight(6.5),
    borderRadius: moderateScale(12),
    backgroundColor: "#F5F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  continueActive: {
    backgroundColor: "#0B3963",
  },
  continueText: {
    fontSize: responsiveFontSize(1.9),
    color: "#1E1E1E",
    fontFamily: Fonts.regular,
  },
  continueTextActive: {
    color: "#fff",
  },
});
