import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { moderateScale } from "react-native-size-matters";
import { Ionicons, Feather } from "@expo/vector-icons";
import Fonts from "../../../constants/Fonts";

const ReviewSendScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>FUSE SMART REMITTANCE</Text>

        <View style={styles.amountCard}>
          <Text style={styles.amountText}>$2,000.00</Text>

          <View style={styles.receiveRow}>
            <Text style={styles.receiveLabel}>Recipient Receives</Text>
            <Text style={styles.receiveAmount}>
              2,410,000.00 <Text style={styles.currency}>NGN</Text>
            </Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Recipient Details</Text>

        <TouchableOpacity style={styles.detailCard}>
          <Text style={styles.detailText}>
            Abayomi <Text style={styles.countryText}>(Nigeria)</Text>
          </Text>

          <Ionicons
            name="chevron-down"
            size={moderateScale(17)}
            color="#1F2A44"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.paymentCard}>
          <Text style={styles.paymentText}>Payment Method</Text>

          <Feather name="plus" size={moderateScale(18)} color="#000" />
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <TouchableOpacity style={styles.confirmButton}>
          <Image
            source={require("../../../../assets/robot.png")}
            style={styles.buttonRobot}
          />
          <Text style={styles.confirmText}>Confirm and Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReviewSendScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(6),
  },

  headerTitle: {
    textAlign: "center",
    fontSize: responsiveFontSize(2.2),
    fontFamily: Fonts.semiBold,
    marginTop: responsiveHeight(5),
    color: "#000",
    marginBottom: responsiveHeight(4),
  },

  amountCard: {
    borderColor: "#000000",
    borderWidth: 0.8,
    borderRadius: moderateScale(14),
    paddingVertical: responsiveWidth(3),
    marginBottom: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(4),
  },

  amountText: {
    fontSize: responsiveFontSize(2.6),
    fontFamily: Fonts.semiBold,
    color: "#000",
    marginBottom: responsiveHeight(2),
  },

  receiveRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  receiveLabel: {
    fontSize: responsiveFontSize(1.4),
    color: "#000",
    fontFamily: Fonts.semiBold,
  },

  receiveAmount: {
    fontSize: responsiveFontSize(2.3),
    fontFamily: Fonts.semiBold,
    color: "#27AE60",
  },

  currency: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.semiBold,
    color: "#000",
  },

  sectionLabel: {
    fontSize: responsiveFontSize(1.4),
    fontFamily: Fonts.semiBold,
    color: "#444",
    marginBottom: responsiveHeight(1.5),
  },

  detailCard: {
    borderRadius: moderateScale(12),
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: responsiveHeight(4),
    backgroundColor: "#ffffff4d",
  },

  detailText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.semiBold,
    color: "#000",
  },

  countryText: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: Fonts.semiBold,
    color: "#6B7280",
  },

  paymentCard: {
    height: responsiveHeight(7),
    borderRadius: moderateScale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(3),
  },

  paymentText: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.semiBold,
    color: "#000",
  },

  confirmButton: {
    height: responsiveHeight(7),
    backgroundColor: "#1F2A50",
    borderRadius: moderateScale(14),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: responsiveHeight(3),
  },

  confirmText: {
    color: "#fff",
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.semiBold,
  },
  buttonRobot: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    marginRight: responsiveWidth(2),
    resizeMode: "contain",
  },
});
