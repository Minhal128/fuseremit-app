import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale } from "react-native-size-matters";
import { FontAwesome5, Feather } from "@expo/vector-icons";

const RecentTransactions: React.FC = () => {
  const transactions = [
    { name: "Arlene Mccoy", amount: "$ 1.7123", type: "neutral" },
    { name: "Arlene Mccoy", amount: "- $500", type: "debit" },
    { name: "Arlene Mccoy", amount: "$ 1.7123", type: "neutral" },
    { name: "Arlene Mccoy", amount: "+ $500", type: "credit" },
  ];

  const yesterdayTransactions = [
    { name: "Arlene Mccoy", amount: "$ 1.7123", type: "neutral" },
    { name: "Arlene Mccoy", amount: "- $500", type: "debit" },
  ];

  const renderIcon = (type: string) => {
    if (type === "debit") {
      return (
        <View style={[styles.iconCircle, { backgroundColor: "#FFE5E5" }]}>
          <Feather
            name="arrow-down-left"
            size={moderateScale(16)}
            color="#FB002E"
          />
        </View>
      );
    }

    if (type === "credit") {
      return (
        <View style={[styles.iconCircle, { backgroundColor: "#CFF7E2" }]}>
          <Feather
            name="arrow-up-right"
            size={moderateScale(16)}
            color="#34A853"
          />
        </View>
      );
    }

    return (
      <View
        style={[styles.iconCircle, { borderColor: "#DADADA", borderWidth: 1 }]}
      >
        <FontAwesome5 name="sync" size={moderateScale(14)} color="#000000" />
      </View>
    );
  };

  const renderAmountStyle = (type: string) => {
    if (type === "debit") return { color: "#FB002E" };
    if (type === "credit") return { color: "#34A853" };
    return { color: "#000" };
  };

  const renderRowBackground = (type: string) => {
    if (type === "debit") return {};
    return {
      backgroundColor: "#F5F5F5",
      borderRadius: moderateScale(12),
      paddingHorizontal: responsiveWidth(2),
      paddingVertical: responsiveHeight(1),
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Recent Transactions</Text>
          <TouchableOpacity style={styles.viewAllBtn}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Today */}
        <Text style={styles.sectionTitle}>Today</Text>
        <View style={styles.card}>
          {transactions.map((item, index) => (
            <View
              key={index}
              style={[styles.row, renderRowBackground(item.type)]}
            >
              <View style={styles.leftRow}>
                {renderIcon(item.type)}
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <Text style={[styles.amount, renderAmountStyle(item.type)]}>
                {item.amount}
              </Text>
            </View>
          ))}
        </View>

        {/* Yesterday */}
        <Text style={styles.sectionTitle}>Yesterday</Text>
        <View style={styles.card}>
          {yesterdayTransactions.map((item, index) => (
            <View
              key={index}
              style={[styles.row, renderRowBackground(item.type)]}
            >
              <View style={styles.leftRow}>
                {renderIcon(item.type)}
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <Text style={[styles.amount, renderAmountStyle(item.type)]}>
                {item.amount}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ height: responsiveHeight(3) }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecentTransactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(1),
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: responsiveHeight(2),
  },

  headerTitle: {
    fontSize: responsiveFontSize(2.3),
    fontFamily: "Manrope-Bold",
    color: "black",
  },

  viewAllBtn: {
    borderWidth: 1,
    borderColor: "#C7CBD6",
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.5),
    borderRadius: moderateScale(6),
    fontFamily: "Manrope-SemiBold",
  },

  viewAllText: {
    fontSize: responsiveFontSize(1.2),
    color: "#1F2A50",
  },

  sectionTitle: {
    fontSize: responsiveFontSize(1.8),
    color: "#000000",
    marginBottom: responsiveHeight(1.5),
    fontFamily: "Manrope-SemiBold",
  },

  card: {
    borderRadius: moderateScale(12),
    paddingVertical: responsiveHeight(1.5),
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: responsiveHeight(1.2),
    paddingHorizontal: responsiveWidth(2),
  },

  leftRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconCircle: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(10),
    justifyContent: "center",
    alignItems: "center",
    marginRight: responsiveWidth(3),
  },

  name: {
    fontSize: responsiveFontSize(2),
    fontFamily: "Manrope-Bold",
    color: "#111",
  },

  amount: {
    fontSize: responsiveFontSize(2),
    fontFamily: "Manrope-SemiBold",
  },
});
