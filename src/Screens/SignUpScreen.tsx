import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale } from "react-native-size-matters";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";

interface Props {
  navigation: any;
}

const SignUpScreen = ({ navigation }: Props) => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [gender, setGender] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const [date, setDate] = useState<any>(null);
  const [dateInput, setDateInput] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const [checked, setChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const genderOptions = ["Male", "Female", "Other"];

  const isValid =
    first && last && email && password && gender && date && checked;

  const borderColor = (value: any) =>
    submitted && !value ? "#FB002E" : "#ccc";

  const handleDateTyping = (text: string) => {
    const numbers = text.replace(/\D/g, "");

    let formatted = numbers;

    if (numbers.length > 2 && numbers.length <= 4) {
      formatted = numbers.slice(0, 2) + "/" + numbers.slice(2);
    } else if (numbers.length > 4) {
      formatted =
        numbers.slice(0, 2) +
        "/" +
        numbers.slice(2, 4) +
        "/" +
        numbers.slice(4, 8);
    }

    setDateInput(formatted);

    if (numbers.length === 8) {
      const day = numbers.slice(0, 2);
      const month = numbers.slice(2, 4);
      const year = numbers.slice(4, 8);

      const isoDate = `${year}-${month}-${day}`;
      setDate(isoDate);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Feather name="chevron-left" size={moderateScale(22)} />
          </TouchableOpacity>

          <Image
            source={require("../../assets/login.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Create Your Account</Text>
        <Text style={styles.subtitle}>
          Please enter your personal details below
        </Text>

        <Input
          label="First Name"
          placeholder="e.g. Mathew"
          value={first}
          setValue={setFirst}
          borderColor={borderColor(first)}
        />
        <Input
          label="Last Name"
          placeholder="e.g. Excel"
          value={last}
          setValue={setLast}
          borderColor={borderColor(last)}
        />
        <Input
          label="Email Address"
          placeholder="e.g. matexc@email.com"
          value={email}
          setValue={setEmail}
          borderColor={borderColor(email)}
        />

        <Text style={styles.label}>Password</Text>
        <View
          style={[
            styles.inputContainer,
            { borderColor: borderColor(password) },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="*********"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {password.length > 0 && (
            <Feather name="check" size={20} color="#1DB954" />
          )}
        </View>

        <Text style={styles.label}>Date Of Birth</Text>

        <View style={{ position: "relative" }}>
          <View
            style={[styles.inputContainer, { borderColor: borderColor(date) }]}
          >
            <TextInput
              style={{ flex: 1 }}
              placeholder="DD/MM/YYYY"
              value={dateInput}
              keyboardType="numeric"
              maxLength={10}
              onChangeText={handleDateTyping}
            />

            <TouchableOpacity>
              <Ionicons name="calendar-clear" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.label}>Gender</Text>
        <View style={{ position: "relative" }}>
          <TouchableOpacity
            style={[
              styles.inputContainer,
              { borderColor: borderColor(gender) },
            ]}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={{ flex: 1 }}>{gender || "e.g. Male"}</Text>
            <Feather name="chevron-down" size={20} />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownOverlay}>
              {genderOptions.map((g) => (
                <TouchableOpacity
                  key={g}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setGender(g);
                    setShowDropdown(false);
                  }}
                >
                  <Text>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <Text style={styles.terms}>
          By continuing, you agree to our{" "}
          <Text style={styles.link}>Terms of Service</Text> and acknowledge our{" "}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setChecked(!checked)}
        >
          <View style={[styles.checkbox, checked && styles.checkboxActive]}>
            {checked && <Feather name="check" size={14} color="#fff" />}
          </View>

          <Text style={styles.checkboxText}>
            Please send me updates, newsletters, special offers, and other
            information via email.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: isValid ? "#0B3963" : "#F5F5F9",
            },
          ]}
          disabled={!isValid}
          onPress={() => navigation.navigate("CreatePin")}
        >
          <Text
            style={[
              styles.buttonText,
              { color: isValid ? "#FFFFFF" : "#1e1e1e8c" },
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const Input = ({ label, placeholder, value, setValue, borderColor }: any) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <View style={[styles.inputContainer, { borderColor }]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
      />
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveHeight(6),
    backgroundColor: "#fff",
  },
  topBar: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: responsiveHeight(2),
  },
  backBtn: { position: "absolute", left: 0 },
  logo: { width: responsiveWidth(50), height: responsiveHeight(5) },
  title: { fontSize: responsiveFontSize(2.5), fontFamily: "Manrope-SemiBold" },
  subtitle: {
    fontSize: responsiveFontSize(1.4),
    color: "#777",
    marginTop: 6,
    fontFamily: "Manrope-Regular",
  },
  label: {
    marginTop: responsiveHeight(2),
    marginBottom: 3,
    fontSize: responsiveFontSize(1.6),
    fontFamily: "Manrope-SemiBold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: responsiveHeight(6.3),
    backgroundColor: "#1e1e1e0c",
  },
  input: {
    flex: 1,
    fontSize: responsiveFontSize(1.7),
    fontFamily: "Manrope-Regular",
    color: "black",
  },

  calendarDropdown: {
    position: "absolute",
    top: responsiveHeight(6.5),
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    zIndex: 1000,
  },

  dropdownOverlay: {
    position: "absolute",
    top: responsiveHeight(6.5),
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    zIndex: 1000,
  },

  dropdownItem: { padding: 12 },

  terms: {
    fontSize: responsiveFontSize(1.5),
    color: "#1E1E1E",
    marginVertical: responsiveHeight(1.8),
    fontFamily: "Manrope-Medium",
  },
  link: { color: "#0B3963", fontWeight: "600" },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  checkbox: {
    width: 16,
    height: 16,
    marginRight: 8,
    justifyContent: "center",
    backgroundColor: "#1e1e1e0c",
    alignItems: "center",
    borderRadius: 4,
    marginTop: responsiveHeight(0.2),
  },
  checkboxActive: { backgroundColor: "#0B3963", borderColor: "#0B3963" },

  checkboxText: {
    flex: 1,
    fontSize: responsiveFontSize(1.5),
    color: "#1E1E1E",
    fontFamily: "Manrope-Medium",
  },

  button: {
    marginTop: 10,
    width: responsiveWidth(88),
    height: responsiveHeight(6.5),
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: responsiveHeight(8),
  },

  buttonText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: "Manrope-Medium",
  },
});
