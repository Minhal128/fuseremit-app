import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Switch,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale } from "react-native-size-matters";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SecuritySettingScreen: React.FC = () => {
  const navigation = useNavigation();
  const [twoFactor, setTwoFactor] = useState(false);
  const [biometric, setBiometric] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F5F7" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: responsiveHeight(5) }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather
              name="chevron-left"
              size={moderateScale(18)}
              color="#000"
            />
          </TouchableOpacity>

          <Image
            source={require("../../../assets/security.png")}
            style={styles.headerImage}
            resizeMode="contain"
          />

          <View style={{ width: responsiveWidth(6) }} />
        </View>

        <Text style={styles.title}>SECURITY SETTINGS</Text>

        {menuRow(
          "Change Password",
          "Update our current password to ensure your account remains secure",
          require("../../../assets/user.png"),
          <Feather name="chevron-right" size={moderateScale(18)} />,
          () => navigation.navigate("ChnagePassword" as never),
        )}

        {menuRow(
          "Two-Factor Authentication",
          "Enhance security of your account by requiring a second verification process",
          require("../../../assets/two.png"),
          <Switch
            value={twoFactor}
            onValueChange={setTwoFactor}
            thumbColor="#FFFFFF"
            trackColor={{ false: "#ccc", true: "#253B6E" }}
          />,
        )}

        {menuRow(
          "Biometric Authentication",
          "Use your device's biometric for a quick and secure login.",
          require("../../../assets/bio.png"),
          <Switch
            value={biometric}
            onValueChange={setBiometric}
            thumbColor="#FFFFFF"
            trackColor={{ false: "#ccc", true: "#253B6E" }}
          />,
        )}

        {menuRow(
          "Security Questions",
          "Add an extra layer of security by setting up security questions.",
          require("../../../assets/user.png"),
          <Feather name="chevron-right" size={moderateScale(18)} />,
          () => navigation.navigate("SecurityQuestion" as never),
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SecuritySettingScreen;

const menuRow = (
  title: string,
  subtitle: string,
  icon: any,
  rightComponent: React.ReactNode,
  onPress?: () => void,
) => {
  return (
    <TouchableOpacity
      style={styles.menuCard}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.leftSection}>
        <Image source={icon} style={styles.menuIcon} />

        <View style={styles.textContainer}>
          <Text style={styles.menuTitle}>{title}</Text>
          <Text style={styles.menuSubtitle}>{subtitle}</Text>
        </View>
      </View>

      {rightComponent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(5),
  },

  headerImage: {
    width: responsiveWidth(35),
    height: responsiveHeight(5.5),
  },

  title: {
    textAlign: "center",
    fontSize: responsiveFontSize(2.1),
    fontFamily: "Manrope-Bold",
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
    color: "#000000",
  },

  menuCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#98939309",
    marginHorizontal: responsiveWidth(5),
    paddingVertical: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(4),
    borderRadius: moderateScale(8),
    marginBottom: responsiveHeight(1.5),
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  menuIcon: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    resizeMode: "contain",
    marginRight: responsiveWidth(3),
  },

  textContainer: {
    flex: 1,
    justifyContent: "center",
  },

  menuTitle: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: "Manrope-Bold",
    color: "#1F2A50",
  },

  menuSubtitle: {
    fontSize: responsiveFontSize(1.5),
    color: "#6B6B6B",
    marginTop: responsiveHeight(0.3),
  },
});
