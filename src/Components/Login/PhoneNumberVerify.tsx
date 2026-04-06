import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale } from "react-native-size-matters";
import { Feather } from "@expo/vector-icons";
import {
  resendEmailLoginOtp,
  verifyEmailLoginOtp,
} from "../../services/authApi";
import { setSession } from "../../services/session";

interface Props {
  navigation: any;
  route: any;
}

const OTP_LENGTH = 6;
const INITIAL_TIME = 60;

const PhoneNumberVerify = ({ navigation, route }: Props) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [seconds, setSeconds] = useState(INITIAL_TIME);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFilled, setIsFilled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const challengeId: string | undefined = route?.params?.challengeId;
  const email: string = route?.params?.email || "";

  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (seconds === 0) return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const checkOtpFilled = (arr: string[]) => {
    setIsFilled(arr.every((v) => v !== ""));
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
      setActiveIndex(-1);
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

  const resendCode = () => {
    void (async () => {
      if (seconds !== 0 || !challengeId || isSubmitting) return;

      try {
        setErrorMessage("");
        setIsSubmitting(true);
        await resendEmailLoginOtp(challengeId);
        setSeconds(INITIAL_TIME);
        setOtp(Array(OTP_LENGTH).fill(""));
        setIsFilled(false);
        setActiveIndex(0);
        inputs.current[0]?.focus();
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to resend OTP right now",
        );
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  const handleVerifyCode = () => {
    void (async () => {
      if (!challengeId || !isFilled || isSubmitting) return;

      try {
        setErrorMessage("");
        setIsSubmitting(true);

        const data = await verifyEmailLoginOtp({
          challengeId,
          otp: otp.join(""),
        });

        await setSession({
          accessToken: data.accessToken,
          user: data.user,
        });

        if (data.requiresPinSetup) {
          navigation.navigate("CreatePin");
          return;
        }

        navigation.navigate("AppServiceBottomNavigation");
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "OTP verification failed",
        );
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  const maskedEmail = (() => {
    if (!email.includes("@")) return email || "your email";
    const [name, domain] = email.split("@");
    const safeName =
      name.length <= 2 ? `${name[0] || "*"}*` : `${name.slice(0, 2)}***`;
    return `${safeName}@${domain}`;
  })();

  const formatTime = () => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View style={styles.topbar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={moderateScale(22)} />
          </TouchableOpacity>

          <Image
            source={require("../../../assets/login.png")}
            resizeMode="contain"
            style={styles.logo}
          />

          <View style={{ width: moderateScale(26) }} />
        </View>

        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.subtitle}>
          Please enter the 6-digit code we sent to {maskedEmail}.
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

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <View style={styles.bottom}>
          <TouchableOpacity
            style={[
              styles.verifyBtn,
              isFilled && !isSubmitting && styles.verifyActive,
            ]}
            disabled={!isFilled || isSubmitting || !challengeId}
            onPress={handleVerifyCode}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text
                style={[
                  styles.verifyText,
                  isFilled && !isSubmitting && styles.verifyTextActive,
                ]}
              >
                Verify Code
              </Text>
            )}
          </TouchableOpacity>

          <Text style={styles.timer}>
            {seconds === 0
              ? "You can resend now"
              : `Resend code in ${formatTime()}`}
          </Text>

          <TouchableOpacity
            onPress={resendCode}
            disabled={seconds !== 0 || isSubmitting || !challengeId}
          >
            <Text
              style={[
                styles.resendLink,
                seconds === 0 && !isSubmitting && styles.resendLinkActive,
              ]}
            >
              Resend Code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PhoneNumberVerify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveHeight(6),
    backgroundColor: "#fff",
  },
  topbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: responsiveWidth(50),
    height: responsiveHeight(5),
  },
  title: {
    fontSize: responsiveFontSize(2.3),
    fontFamily: "Manrope-SemiBold",
    marginTop: responsiveHeight(2),
  },
  subtitle: {
    fontSize: responsiveFontSize(1.5),
    color: "#777",
    marginTop: moderateScale(6),
    fontFamily: "Manrope-Regular",
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: responsiveHeight(2),
  },
  otpBox: {
    width: responsiveWidth(13),
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
  errorText: {
    color: "#FB002E",
    marginTop: responsiveHeight(1.5),
    fontSize: responsiveFontSize(1.4),
    fontFamily: "Manrope-SemiBold",
  },

  bottom: {
    position: "absolute",
    bottom: responsiveHeight(4),
    alignSelf: "center",
    alignItems: "center",
  },
  verifyBtn: {
    width: responsiveWidth(88),
    height: responsiveHeight(6.5),
    borderRadius: moderateScale(12),
    backgroundColor: "#F5F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  verifyActive: {
    backgroundColor: "#0B3963",
  },
  verifyText: {
    fontSize: responsiveFontSize(1.9),
    color: "#1E1E1E",
    fontFamily: "Manrope-Regular",
  },
  verifyTextActive: {
    color: "#fff",
  },
  timer: {
    marginTop: moderateScale(10),
    fontSize: responsiveFontSize(1.4),
    color: "#555",
    fontFamily: "Manrope-Regular",
  },
  resendLink: {
    marginTop: responsiveHeight(0.8),
    fontSize: responsiveFontSize(1.5),
    color: "#9AA3AA",
    fontFamily: "Manrope-SemiBold",
  },
  resendLinkActive: {
    color: "#0B3963",
  },
});
