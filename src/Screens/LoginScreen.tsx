import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { moderateScale, scale } from "react-native-size-matters";
import { Feather } from "@expo/vector-icons";
import { requestEmailLoginOtp } from "../services/authApi";

interface Props {
  navigation: any;
}

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPasswordFilled = password.length >= 8;
  const isFormValid = isValidEmail && isPasswordFilled;

  const handleContinue = async () => {
    if (!isFormValid || isSubmitting) return;

    try {
      setErrorMessage("");
      setIsSubmitting(true);

      const data = await requestEmailLoginOtp({
        email: email.trim().toLowerCase(),
        password,
      });

      navigation.navigate("PhoneNumberVerify", {
        challengeId: data.challengeId,
        email: email.trim().toLowerCase(),
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to continue. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/login.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Log In</Text>

        <View style={styles.subtitleRow}>
          <Text style={styles.subtitle}>Don’t have an account?</Text>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.link}> Sign Up</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Email Address</Text>

        <View
          style={[
            styles.inputContainer,
            !isValidEmail && styles.inputError,
            isValidEmail && styles.inputSuccess,
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          {isValidEmail && <Feather name="check" size={20} color="#1DB954" />}
        </View>

        <Text style={styles.label}>Password</Text>

        <View
          style={[
            styles.inputContainer,
            isPasswordFilled && styles.inputSuccess,
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter your password (min 8 chars)"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {isPasswordFilled && (
            <Feather name="check" size={20} color="#1DB954" />
          )}
        </View>

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity
          style={[
            styles.button,
            isFormValid && !isSubmitting && styles.buttonActive,
          ]}
          disabled={!isFormValid || isSubmitting}
          onPress={handleContinue}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text
              style={[
                styles.buttonText,
                isFormValid && !isSubmitting && styles.buttonTextActive,
              ]}
            >
              Continue
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveHeight(6),
    backgroundColor: "#fff",
  },

  logo: {
    width: responsiveWidth(58),
    height: responsiveHeight(8),
    alignSelf: "center",
    marginBottom: responsiveHeight(3),
  },

  title: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: "Manrope-SemiBold",
  },

  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(6),
  },

  subtitle: {
    fontSize: responsiveFontSize(1.4),
    color: "#777",
    fontFamily: "Manrope-Regular",
  },

  link: {
    color: "#000",
    fontFamily: "Manrope-SemiBold",
    fontSize: scale(10),
  },

  label: {
    marginTop: responsiveHeight(2),
    marginBottom: moderateScale(3),
    fontSize: responsiveFontSize(1.4),
    color: "#000",
    fontFamily: "Manrope-SemiBold",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.2,
    borderColor: "#FB002E",
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(10),
    height: responsiveHeight(6.2),
    backgroundColor: "#1e1e1e0c",
  },

  inputError: {
    borderColor: "#FB002E",
    backgroundColor: "#1e1e1e0c",
  },

  inputSuccess: {
    borderWidth: 0,
    backgroundColor: "#1e1e1e0c",
  },

  input: {
    flex: 1,
    fontSize: responsiveFontSize(1.6),
    fontFamily: "Manrope-Regular",
  },

  errorText: {
    color: "#FB002E",
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(1.4),
    fontFamily: "Manrope-SemiBold",
  },

  button: {
    position: "absolute",
    bottom: responsiveHeight(5),
    alignSelf: "center",
    width: responsiveWidth(88),
    height: responsiveHeight(6.5),
    borderRadius: moderateScale(12),
    backgroundColor: "#D6DEE4",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonActive: {
    backgroundColor: "#0B3963",
  },

  buttonText: {
    color: "#9AA3AA",
    fontSize: responsiveFontSize(1.8),
    fontFamily: "Manrope-Regular",
  },

  buttonTextActive: {
    color: "#fff",
  },
});
