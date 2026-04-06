import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  TextInput,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale } from "react-native-size-matters";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const ProfileSettingScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);

  const [fullName, setFullName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex.johnson@email.com");
  const [phone, setPhone] = useState("+1 555-0192");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F6FA" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="chevron-back"
              size={moderateScale(18)}
              color="#000"
            />
          </TouchableOpacity>

          <Image
            source={require("../../../assets/user.png")}
            style={styles.headerImage}
            resizeMode="contain"
          />

          <View style={{ width: responsiveWidth(8) }} />
        </View>

        <Text style={styles.screenTitle}>PROFILE</Text>

        <View style={styles.profileImageWrapper}>
          <Image
            source={require("../../../assets/profileimg.png")}
            style={styles.profileImage}
          />

          <TouchableOpacity style={styles.cameraIconWrapper}>
            <Ionicons name="camera" size={moderateScale(15)} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.formWrapper}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={fullName}
              editable={isNameEditable}
              onChangeText={setFullName}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setIsNameEditable(!isNameEditable)}
            >
              <Feather name="edit" size={20} color="#000000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={email}
              editable={isEmailEditable}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setIsEmailEditable(!isEmailEditable)}
            >
              <Feather name="edit" size={20} color="#000000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={phone}
              editable
              onChangeText={setPhone}
              style={styles.input}
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileSettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },

  scrollContainer: {
    paddingHorizontal: responsiveWidth(6),
    paddingBottom: responsiveHeight(5),
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: responsiveHeight(5),
  },

  backButton: {
    width: responsiveWidth(8),
  },

  headerImage: {
    width: responsiveWidth(30),
    height: responsiveHeight(5),
  },

  screenTitle: {
    textAlign: "center",
    fontSize: responsiveFontSize(2.2),
    fontFamily: "Manrope-SemiBold",
    marginTop: responsiveHeight(1.5),
  },

  profileImageWrapper: {
    alignItems: "center",
    marginTop: responsiveHeight(2),
  },

  profileImage: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    borderRadius: responsiveWidth(15),
  },

  cameraIconWrapper: {
    position: "absolute",
    bottom: 0,
    right: responsiveWidth(32),
    backgroundColor: "#FFF",
    width: responsiveWidth(7),
    height: responsiveWidth(7),
    borderRadius: responsiveWidth(4),
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  formWrapper: {
    marginTop: responsiveHeight(4),
  },

  label: {
    fontSize: responsiveFontSize(1.4),
    marginBottom: responsiveHeight(0.5),
    fontFamily: "Manrope-SemiBold",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8f8d8d16",
    borderRadius: moderateScale(8),
    paddingHorizontal: responsiveWidth(4),
    height: responsiveHeight(6.5),
    marginBottom: responsiveHeight(2.5),
  },

  input: {
    flex: 1,
    fontSize: responsiveFontSize(1.5),
    color: "#000",
    fontFamily: "Manrope-SemiBold",
  },

  buttonWrapper: {
    paddingHorizontal: responsiveWidth(6),
    paddingBottom: responsiveHeight(3),
    backgroundColor: "#F5F6FA",
  },

  saveButton: {
    backgroundColor: "#1F2A50",
    height: responsiveHeight(7),
    borderRadius: moderateScale(8),
    justifyContent: "center",
    alignItems: "center",
  },

  saveButtonText: {
    color: "#FFF",
    fontSize: responsiveFontSize(1.8),
    fontFamily: "Manrope-SemiBold",
  },
});
