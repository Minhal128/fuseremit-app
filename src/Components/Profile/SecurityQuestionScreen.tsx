import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Image,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale } from "react-native-size-matters";
import { Feather } from "@expo/vector-icons";

interface Props {
  navigation: any;
}

const SecurityQuestionScreen = ({ navigation }: Props) => {
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");

  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [a3, setA3] = useState("");

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const questions = [
    "What was your Childhood dream job?",
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "What is your favorite teacher's name?",
  ];

  const renderDropdown = (
    value: string,
    setValue: (val: string) => void,
    show: boolean,
    setShow: (val: boolean) => void,
    zIndex: number,
  ) => (
    <View style={{ zIndex }}>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => {
          setShow1(false);
          setShow2(false);
          setShow3(false);
          setShow(!show);
        }}
      >
        <Text style={{ flex: 1 }}>{value || "Select Security Question"}</Text>
        <Feather name="chevron-down" size={20} />
      </TouchableOpacity>

      {show && (
        <View style={styles.dropdownAbsolute}>
          {questions.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.dropdownItem}
              onPress={() => {
                setValue(item);
                setShow(false);
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const renderAnswerInput = (
    value: string,
    setValue: (val: string) => void,
  ) => (
    <>
      <Text style={styles.answerLabel}>Answer to the Question</Text>
      <View style={styles.answerInputContainer}>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder="Provide an Answer"
          placeholderTextColor="#999"
          style={styles.answerInput}
        />
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F6FA" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Feather name="chevron-left" size={moderateScale(22)} />
            </TouchableOpacity>

            <Image
              source={require("../../../assets/two.png")}
              style={styles.headerImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>SECURITY QUESTIONS</Text>

          <Text style={styles.label}>Pick The First Security Question</Text>
          {renderDropdown(q1, setQ1, show1, setShow1, 30)}
          {renderAnswerInput(a1, setA1)}

          <Text style={styles.label}>Pick The Second Security Question</Text>
          {renderDropdown(q2, setQ2, show2, setShow2, 20)}
          {renderAnswerInput(a2, setA2)}

          <Text style={styles.label}>Pick The Third Security Question</Text>
          {renderDropdown(q3, setQ3, show3, setShow3, 10)}
          {renderAnswerInput(a3, setA3)}

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SecurityQuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },

  scrollContainer: {
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveHeight(5),
    paddingBottom: responsiveHeight(5),
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: responsiveHeight(2),
  },

  backBtn: {
    position: "absolute",
    left: 0,
  },

  headerImage: {
    width: responsiveWidth(30),
    height: responsiveHeight(5),
    resizeMode: "contain",
  },

  title: {
    textAlign: "center",
    fontSize: responsiveFontSize(2.2),
    fontFamily: "Manrope-SemiBold",
    marginBottom: responsiveHeight(2),
  },

  label: {
    marginTop: responsiveHeight(2),
    marginBottom: 6,
    fontSize: responsiveFontSize(1.4),
    fontFamily: "Manrope-SemiBold",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: responsiveHeight(6.5),
    backgroundColor: "#1e1e1e16",
  },

  dropdownAbsolute: {
    position: "absolute",
    top: responsiveHeight(7.5),
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 8,
    paddingVertical: 5,
  },

  dropdownItem: {
    padding: 12,
  },

  answerLabel: {
    marginTop: responsiveHeight(1.5),
    marginBottom: 6,
    fontSize: responsiveFontSize(1.3),
    fontFamily: "Manrope-SemiBold",
  },

  answerInputContainer: {
    backgroundColor: "#1e1e1e16",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: responsiveHeight(6.5),
    justifyContent: "center",
    marginBottom: responsiveHeight(1),
  },

  answerInput: {
    fontSize: responsiveFontSize(1.5),
    fontFamily: "Manrope-SemiBold",
    color: "#000",
  },

  button: {
    marginTop: responsiveHeight(3),
    height: responsiveHeight(7),
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1F2A50",
    width: "100%",
  },

  buttonText: {
    fontSize: responsiveFontSize(1.9),
    fontFamily: "Manrope-Bold",
    color: "#fff",
  },
});
