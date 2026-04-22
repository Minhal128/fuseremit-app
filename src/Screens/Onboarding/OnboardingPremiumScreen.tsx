import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { moderateScale } from "react-native-size-matters";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Fonts from "../../constants/Fonts";

const OnboardingPremiumScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={moderateScale(22)} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Get Started</Text>

        <TouchableOpacity>
          <Ionicons name="notifications" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.subTitle}>
          Complete the steps below to upgrade your account to FuseRemit Premium.
        </Text>

        <View style={styles.stepRow}>
          <Feather name="check" size={moderateScale(18)} color="#27AE60" />
          <Text style={styles.stepText}>Upload Utility Bill</Text>
        </View>
      </View>

      {/* Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate("MainKYC")}
        >
          <Text style={styles.buttonText}>Start KYC</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingPremiumScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(5),
  },

  headerTitle: {
    fontSize: responsiveFontSize(2.5),
    fontFamily: Fonts.semiBold,
  },

  content: {
    flex: 1,
    paddingHorizontal: responsiveWidth(6),
  },

  subTitle: {
    fontSize: responsiveFontSize(1.9),
    textAlign: "center",
    marginVertical: responsiveHeight(5),
    fontFamily: Fonts.semiBold,
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: responsiveHeight(6),
  },

  stepText: {
    marginLeft: responsiveWidth(2),
    fontFamily: Fonts.semiBold,
  },

  buttonContainer: {
    paddingHorizontal: responsiveWidth(6),
    paddingBottom: responsiveHeight(8),
  },

  customButton: {
    backgroundColor: "#0B3963",
    paddingVertical: responsiveHeight(2),
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(2),
    fontFamily: Fonts.semiBold,
  },
});
