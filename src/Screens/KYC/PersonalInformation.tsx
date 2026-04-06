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
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale } from "react-native-size-matters";
import { Feather, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

interface Props {
  navigation: any;
}

const PersonalInformation = ({ navigation }: Props) => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");

  const [gender, setGender] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const [date, setDate] = useState<Date | undefined>();
  const [showPicker, setShowPicker] = useState(false);

  const genderOptions = ["Male", "Female", "Other"];

  const onDateChange = (_: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const formattedDate = date
    ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    : "DD/MM/YYYY";

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* TopBar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Feather name="chevron-left" size={moderateScale(22)} />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: responsiveFontSize(2.4),
              fontFamily: "Manrope-SemiBold",
            }}
          >
            Personal Information
          </Text>

          <TouchableOpacity style={{ position: "absolute", right: 0 }}>
            <Ionicons name="notifications" size={moderateScale(22)} />
          </TouchableOpacity>
        </View>

        <Input
          label="First Name"
          placeholder="e.g. Mathew"
          value={first}
          setValue={setFirst}
        />
        <Input
          label="Last Name"
          placeholder="e.g. Excel"
          value={last}
          setValue={setLast}
        />
        <Input
          label="Email Address"
          placeholder="e.g. matexc@email.com"
          value={email}
          setValue={setEmail}
        />

        {/* DOB */}
        <Text style={styles.label}>DOB</Text>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setShowPicker(true)}
        >
          <Text style={{ flex: 1 }}>{formattedDate}</Text>
          <Ionicons name="calendar-clear" size={20} color="black" />
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        {/* Gender */}
        <View style={{ zIndex: 10 }}>
          <Text style={styles.label}>Gender</Text>

          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={{ flex: 1 }}>{gender || "e.g. Male"}</Text>
            <Feather name="chevron-down" size={20} />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownAbsolute}>
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

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#0B3963" }]}
          onPress={() => navigation.navigate("BackgroundInformation")}
        >
          <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PersonalInformation;

/* INPUT */
const Input = ({ label, placeholder, value, setValue }: any) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>
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
    paddingTop: responsiveHeight(5),
    backgroundColor: "#fff",
  },

  topBar: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: responsiveHeight(2),
  },

  backBtn: {
    position: "absolute",
    left: 0,
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
    borderRadius: 8,
    paddingHorizontal: 10,
    height: responsiveHeight(6.3),
    backgroundColor: "#1e1e1e16",
  },

  input: {
    flex: 1,
    fontSize: responsiveFontSize(1.6),
    fontFamily: "Manrope-SemiBold",
  },

  dropdownAbsolute: {
    position: "absolute",
    top: responsiveHeight(11),
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 6,
    paddingVertical: 5,
  },

  dropdownItem: {
    padding: 12,
  },

  button: {
    marginTop: responsiveHeight(19),
    width: responsiveWidth(88),
    height: responsiveHeight(6.6),
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: responsiveHeight(6),
  },

  buttonText: {
    fontSize: responsiveFontSize(2),
    fontFamily: "Manrope-Bold",
  },
});
