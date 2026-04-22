import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import Fonts from "../../constants/Fonts";

interface Props {
  navigation: any;
}

const PrivacyPolicyScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={moderateScale(22)}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>PRIVACY POLICY</Text>

        {/* Empty view for center alignment */}
        <View style={{ width: moderateScale(22) }} />
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainTitle}>FUSEREMIT PRIVACY POLICY</Text>

        <Text style={styles.sectionTitle}>1. INTRODUCTION</Text>

        <Text style={styles.paragraph}>
          Fuseremit (“Fuseremit”, “we”, “our”, or “us”) is an AI-powered fintech
          mobile and web application that enables users to send and receive
          money, cross-border remittances, currency exchange, AI-driven
          financial insights, fraud detection, smart budgeting.
        </Text>

        <Text style={styles.paragraph}>
          We are committed to protecting the privacy, confidentiality, and
          integrity of personal and financial data entrusted to us. This Privacy
          Policy explains how we collect, use, process, store, share, and
          protect personal information in compliance with:
        </Text>

        <Text style={styles.bullet}>• The General Data Protection Regulation (EU) 2016/679 (GDPR)</Text>
        <Text style={styles.bullet}>• The Nigeria Data Protection Regulation (NDPR) 2019</Text>
        <Text style={styles.bullet}>• The California Consumer Privacy Act (CCPA), as amended by CPRA</Text>
        <Text style={styles.bullet}>• Applicable global financial services and data protection standards</Text>

        <Text style={styles.paragraph}>
          This Privacy Policy applies to:
        </Text>

        <Text style={styles.bullet}>• Our mobile applications</Text>
        <Text style={styles.bullet}>• Our web platform</Text>
        <Text style={styles.bullet}>• All related services, features, APIs, and integrations</Text>
        <Text style={styles.bullet}>• Communications and interactions with users, partners, and regulators</Text>

        <Text style={styles.paragraph}>
          By accessing or using Fuseremit, you acknowledge that you have read and
          understood this Privacy Policy.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },

  header: {
    height: responsiveHeight(14),
    backgroundColor: "#1F2B55",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: responsiveWidth(4),
    paddingTop: responsiveHeight(3)
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(2),
    fontFamily: Fonts.bold,
  },

  content: {
    padding: responsiveWidth(5),
  },

  mainTitle: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.bold,
    marginBottom: responsiveHeight(2),
    color: "#000",
  },

  sectionTitle: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.bold,
    marginBottom: responsiveHeight(1),
    color: "#000",
  },

  paragraph: {
    fontSize: responsiveFontSize(1.6),
    color: "#333",
    lineHeight: moderateScale(22),
    marginBottom: responsiveHeight(1.5),
  },

  bullet: {
    fontSize: responsiveFontSize(1.55),
    color: "#333",
    lineHeight: moderateScale(22),
    marginLeft: moderateScale(6),
    marginBottom: responsiveHeight(0.7),
  },
});