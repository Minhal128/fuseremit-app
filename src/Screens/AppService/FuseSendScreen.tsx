import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale } from "react-native-size-matters";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const FuseSendScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [country, setCountry] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [showDropdown, setShowDropdown] = useState(false);

  const countryOptions = ["Pakistan", "USA", "UK", "Canada"];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <View style={styles.headerWrapper}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Feather name="chevron-left" size={moderateScale(20)} />
            </TouchableOpacity>

            <Text style={styles.title}>SEND MONEY</Text>
          </View>
          <Text style={styles.sectionTitle}>Sender Information</Text>

          <Input
            label="Full Name"
            placeholder="Enter Full Name"
            value={senderName}
            setValue={setSenderName}
          />

          <Input
            label="Email Address"
            placeholder="Enter Email Address"
            value={senderEmail}
            setValue={setSenderEmail}
          />

          <Text style={styles.sectionTitle}>Recipient details</Text>

          <Input
            label="Full Name"
            placeholder="Enter Full Name"
            value={recipientName}
            setValue={setRecipientName}
          />

          <Input
            label="Email Address"
            placeholder="Enter Email Address"
            value={recipientEmail}
            setValue={setRecipientEmail}
          />

          <View style={{ zIndex: 10 }}>
            <Text style={styles.label}>Recipient Country</Text>

            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text style={{ flex: 1 }}>{country || "Choose Country"}</Text>
              <Feather name="chevron-down" size={20} />
            </TouchableOpacity>

            {showDropdown && (
              <View style={styles.dropdownAbsolute}>
                {countryOptions.map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setCountry(item);
                      setShowDropdown(false);
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <Input
            label="Bank Name"
            placeholder="Enter Bank Name"
            value={bankName}
            setValue={setBankName}
          />

          <Input
            label="Account Number"
            placeholder="Enter Account Number"
            value={accountNumber}
            setValue={setAccountNumber}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("SendMoneySecond")}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FuseSendScreen;

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  setValue: (text: string) => void;
  keyboardType?: any;
}

const Input = ({
  label,
  placeholder,
  value,
  setValue,
  keyboardType,
}: InputProps) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#777"
        value={value}
        onChangeText={setValue}
        keyboardType={keyboardType}
      />
    </View>
  </>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  headerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(2),
    marginTop: responsiveHeight(5),
  },

  backBtn: {
    position: "absolute",
    left: responsiveWidth(-1),
  },

  title: {
    fontSize: responsiveFontSize(2.1),
    fontFamily: "Manrope-Bold",
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: responsiveWidth(5),
    paddingBottom: responsiveHeight(1),
  },

  sectionTitle: {
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(2),
    fontFamily: "Manrope-Bold",
  },

  label: {
    marginTop: responsiveHeight(2),
    marginBottom: 3,
    fontSize: responsiveFontSize(1.4),
    fontFamily: "Manrope-SemiBold",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(8),
    height: responsiveHeight(6.3),
    backgroundColor: "#1e1e1e0f",
  },

  input: {
    flex: 1,
    fontSize: responsiveFontSize(1.6),
    fontFamily: "Manrope-SemiBold",
  },

  dropdownAbsolute: {
    position: "absolute",
    top: responsiveHeight(10.5),
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 6,
    paddingVertical: 5,
  },

  dropdownItem: {
    padding: moderateScale(12),
  },

  button: {
    marginTop: responsiveHeight(3),
    width: responsiveWidth(91),
    height: responsiveHeight(6.6),
    borderRadius: moderateScale(12),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#1F2A50",
    marginBottom: responsiveHeight(6),
  },

  buttonText: {
    fontSize: responsiveFontSize(2),
    fontFamily: "Manrope-Bold",
    color: "#FFFFFF",
  },
});
