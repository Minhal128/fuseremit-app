import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale } from "react-native-size-matters";
import { FontAwesome6, Feather } from "@expo/vector-icons";

const TABS = ["1D", "1W", "1M", "3M", "6M", "1Y", "ALL"];

const AnalyticsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("1W");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity>
          <Feather name="chevron-left" size={22} />
        </TouchableOpacity>
        <Text style={styles.title}>ANALYTICS</Text>
        <View style={{ width: 20 }} />
      </View>

      <Text style={styles.subTitle}>Total Spend</Text>

      <View style={styles.amountRow}>
        <Text style={styles.amount}>$2,450.75</Text>
        <View style={styles.percentageRow}>
          <FontAwesome6 name="arrow-trend-up" size={12} color="#1F2A50" />
          <Text style={styles.percentage}>3.66%</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.scoreHeader}>
        <Text style={styles.scoreTitle}>FUSE SMART SCORE</Text>
        <Text style={styles.scoreValue}>75/100</Text>
      </View>

      <View style={styles.progressContainer}>
        {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
          <View
            key={index}
            style={[styles.progressItem, index < 4 && styles.progressActive]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default AnalyticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: responsiveHeight(5),
    marginBottom: responsiveHeight(3),
  },

  title: {
    textAlign: "center",
    fontSize: responsiveFontSize(2),
    fontFamily: "Manrope-SemiBold",
    color: "#000",
  },

  subTitle: {
    fontSize: responsiveFontSize(1.7),
    color: "#000000",
    marginBottom: moderateScale(6),
    fontFamily: "Manrope-SemiBold",
  },

  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
    marginBottom: responsiveHeight(3),
  },

  percentageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(4),
  },

  amount: {
    fontSize: responsiveFontSize(3.2),
    fontFamily: "Manrope-Bold",
    color: "#1F2A50",
  },

  percentage: {
    fontSize: responsiveFontSize(1.4),
    color: "#27AE60",
    fontFamily: "Manrope-Bold",
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#1E2A5A",
    borderRadius: moderateScale(8),
    padding: moderateScale(4),
    justifyContent: "space-between",
    marginBottom: responsiveHeight(4),
  },

  tab: {
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(6),
  },

  activeTab: {
    borderColor: "#fff",
    borderWidth: 1,
  },

  tabText: {
    color: "#fff",
    fontSize: responsiveFontSize(1.4),
    fontFamily: "Manrope-SemiBold",
  },

  activeTabText: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "Manrope-SemiBold",
  },

  scoreHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: responsiveHeight(1.5),
  },

  scoreTitle: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: "Manrope-Bold",
    color: "#000",
  },

  scoreValue: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: "Manrope-Bold",
    color: "#000",
  },

  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#1f2a509d",
    borderRadius: moderateScale(8),
    padding: moderateScale(10),
    marginTop: moderateScale(8),
  },

  progressItem: {
    width: responsiveWidth(11),
    height: moderateScale(14),
    borderRadius: moderateScale(10),
    backgroundColor: "#E5E7EB",
  },

  progressActive: {
    backgroundColor: "#1E2A5A",
  },
});
