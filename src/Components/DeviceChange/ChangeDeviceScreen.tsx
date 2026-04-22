import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
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
import { Feather } from "@expo/vector-icons";
import Fonts from "../../constants/Fonts";

interface Props {
  navigation: any;
}

const ChangeDeviceScreen = ({ navigation }: Props) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const isValidNumber = phone.length >= 9;
  const isPasswordFilled = password.length > 0;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Image
          source={require("../../../assets/login.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={styles.title}>Change Device</Text>
        <Text style={styles.subtitle}>
          Provide the required information below to change your device.
        </Text>

        <Text style={styles.label}>Account Number</Text>

        {/* Phone */}
        <View
          style={[
            styles.inputContainer,
            !isValidNumber && styles.inputError,
            isValidNumber && styles.inputSuccess,
          ]}
        >

          <TextInput
            style={styles.input}
            placeholder="e.g. 1234567890"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            maxLength={12}
          />

          {isValidNumber && <Feather name="check" size={20} color="#1DB954" />}
        </View>

        <Text style={styles.label}>Transaction PIN</Text>

        {/* Password */}
        <View
          style={[
            styles.inputContainer,
            isPasswordFilled && styles.inputSuccess,
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Button */}
        <TouchableOpacity
          style={[
            styles.button,
            isValidNumber && isPasswordFilled && styles.buttonActive,
          ]}
          disabled={!(isValidNumber && isPasswordFilled)}
          onPress={() => navigation.navigate("ChangeDevicePhoneVerify")}
        >
          <Text
            style={[
              styles.buttonText,
              isValidNumber && isPasswordFilled && styles.buttonTextActive,
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChangeDeviceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveHeight(6),
    backgroundColor: "#fff",
  },

  logo: {
    width: responsiveWidth(60),
    height: responsiveHeight(10),
    alignSelf: "center",
    marginBottom: responsiveHeight(4),
    resizeMode: "contain",
  },

  title: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: Fonts.semiBold,
  },

  subtitle: {
    fontSize: responsiveFontSize(1.4),
    color: "#777",
    marginTop: moderateScale(6),
    fontFamily: Fonts.regular,
  },

  link: {
    color: "#000",
    fontFamily: Fonts.semiBold,
  },

  label: {
    marginTop: responsiveHeight(2),
    marginBottom: moderateScale(3),
    fontSize: responsiveFontSize(1.4),
    color: "#000",
    fontFamily: Fonts.semiBold,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.2,
    borderColor: "#FB002E",
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(10),
    height: responsiveHeight(6.5),
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

  countryCode: {
    marginRight: moderateScale(2),
    fontWeight: "500",
  },

  input: {
    flex: 1,
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.regular,
  },

  button: {
    position: "absolute",
    bottom: responsiveHeight(4),
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
    fontFamily: Fonts.regular,
  },

  buttonTextActive: {
    color: "#fff",
  },
});
