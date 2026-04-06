import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale, scale } from "react-native-size-matters";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const SendMoneySecond = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7F7" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.headerWrapper}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Feather name="chevron-left" size={moderateScale(22)} />
          </TouchableOpacity>

          <Text style={styles.title}>SEND MONEY</Text>
        </View>

        <Text style={styles.label}>You Send</Text>

        <View style={styles.amountCard}>
          <Text style={styles.amountText}>2,000</Text>

          <View style={styles.currencyWrapper}>
            <Image
              source={require("../../../../assets/usa.png")}
              style={styles.flag}
            />
            <Text style={styles.currencyText}>USD</Text>
            <Feather
              name="chevron-down"
              size={moderateScale(16)}
              style={{ marginTop: scale(2) }}
            />
          </View>
        </View>

        <View style={styles.discountBar}>
          <Text style={styles.discountText}>
            Send over 30,000 USD or equivalent to be eligible for discount
          </Text>
        </View>

        <View style={styles.arrowWrapper}>
          <Image
            source={require("../../../../assets/swap.png")}
            style={styles.swapImage}
          />
        </View>

        {/* RECIPIENT */}
        <Text style={styles.label}>Recipient gets</Text>

        <View style={styles.amountCard}>
          <Text style={styles.amountText}>3,160,000.00</Text>

          <View style={styles.currencyWrapper}>
            <Image
              source={require("../../../../assets/ngn.png")}
              style={styles.flag}
            />
            <Text style={styles.currencyText}>NGN</Text>
            <Feather name="chevron-down" size={moderateScale(18)} />
          </View>
        </View>

        <View style={styles.rateRow}>
          <Image
            source={require("../../../../assets/ngn.png")}
            style={[styles.flag, { marginRight: 8 }]}
          />
          <Text style={styles.rateText}>NGN 1$ = ₦1,540.00</Text>
        </View>

        {/* PAYMENT */}
        <Text style={[styles.label, { marginTop: responsiveHeight(3) }]}>
          Choose your payment method
        </Text>

        <View style={styles.paymentCard}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome6
              name="hand-holding-dollar"
              style={{ marginRight: scale(10) }}
              size={20}
              color="black"
            />
            <Text style={styles.paymentText}>Connected bank account (ACH)</Text>
          </View>

          <TouchableOpacity style={styles.changeBtn}>
            <Text style={styles.changeText}>Change</Text>
            <Feather
              name="chevron-right"
              size={moderateScale(12)}
              color="#000"
              style={{ marginLeft: scale(2), marginTop: responsiveHeight(0.4) }}
            />
          </TouchableOpacity>
        </View>

        {/* FEE */}
        <View style={styles.feeBox}>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>
              Connected bank account (ACH) fee
            </Text>
            <Text style={styles.feeValue}>19.70 USD</Text>
          </View>

          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Fuseremit Fee</Text>
            <Text style={styles.feeValue}>19.28 USD</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.feeRow}>
            <Text style={styles.totalLabel}>Total Included Fees</Text>
            <Text style={styles.totalValue}>40 USD</Text>
          </View>
        </View>

        <Text style={styles.saveText}>
          MAYA AI : You could save up to 23.66$
        </Text>

        {/* BUTTON */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SendMoneyDetail')}>
          <Text style={styles.buttonText}>Send Money</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SendMoneySecond;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: responsiveWidth(5),
    paddingBottom: responsiveHeight(4),
  },

  headerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(5),
  },

  backBtn: {
    position: "absolute",
    left: responsiveWidth(0),
  },

  title: {
    fontSize: responsiveFontSize(2.1),
    fontFamily: "Manrope-Bold",
  },

  label: {
    marginTop: responsiveHeight(2.5),
    fontSize: responsiveFontSize(1.5),
    fontFamily: "Manrope-SemiBold",
  },

  amountCard: {
    marginTop: responsiveHeight(1),
    height: responsiveHeight(7),
    backgroundColor: "#1e1e1e0f",
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  amountText: {
    fontSize: responsiveFontSize(2.1),
    fontFamily: "Manrope-Bold",
  },

  currencyWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  currencyText: {
    marginHorizontal: 6,
    fontSize: responsiveFontSize(2),
    fontFamily: "Manrope-Bold",
  },

  flag: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    borderRadius: 100,
    resizeMode: "cover",
  },

  discountBar: {
    marginTop: responsiveHeight(1),
    backgroundColor: "#0b38634b",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: moderateScale(6),
  },

  discountText: {
    fontSize: responsiveFontSize(1.2),
  },

  arrowWrapper: {
    alignItems: "center",
    marginTop: responsiveHeight(2),
  },

  swapImage: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
    resizeMode: "contain",
  },

  rateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: responsiveHeight(1),
  },

  rateText: {
    fontSize: responsiveFontSize(1.4),
    fontFamily: "Manrope-SemiBold",
  },

  paymentCard: {
    marginTop: responsiveHeight(1),
    height: responsiveHeight(7),
    backgroundColor: "#ECECEC",
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  paymentText: {
    fontSize: responsiveFontSize(1.5),
    fontFamily: "Manrope-SemiBold",
  },

  changeBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF0EE",
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(50),
  },

  changeText: {
    fontSize: responsiveFontSize(1.3),
    fontFamily: "Manrope-Bold",
    color: "#000",
  },

  feeBox: {
    marginTop: responsiveHeight(2),
    borderWidth: 1,
    borderColor: "#1e1e1e82",
    borderRadius: moderateScale(12),
    padding: moderateScale(10),
  },

  feeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: responsiveHeight(0.7),
  },

  feeLabel: {
    fontSize: responsiveFontSize(1.2),
    fontFamily: "Manrope-SemiBold",
  },

  feeValue: {
    fontSize: responsiveFontSize(1.2),
    fontFamily: "Manrope-SemiBold",
  },

  divider: {
    height: 1,
    backgroundColor: "#CFCFCF",
    marginVertical: responsiveHeight(0.5),
  },

  totalLabel: {
    fontSize: responsiveFontSize(1.2),
    fontFamily: "Manrope-SemiBold",
  },

  totalValue: {
    fontSize: responsiveFontSize(1.5),
    fontFamily: "Manrope-Bold",
  },

  saveText: {
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(1.3),
    fontFamily: "Manrope-Bold",
    color: 'black'
  },

  button: {
    marginTop: responsiveHeight(5),
    height: responsiveHeight(6.6),
    backgroundColor: "#1F2A50",
    borderRadius: moderateScale(12),
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: responsiveFontSize(2),
    fontFamily: "Manrope-Bold",
    color: "#FFFFFF",
  },
});