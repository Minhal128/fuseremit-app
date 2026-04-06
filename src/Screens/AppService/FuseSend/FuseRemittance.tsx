import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale } from "react-native-size-matters";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const FuseRemittance: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>FUSE SMART REMITTANCE</Text>

        <ImageBackground
          source={require("../../../../assets/mainbg.png")}
          style={styles.predictionContainer}
          imageStyle={{ resizeMode: "contain" }}
        >
          <View style={styles.predictionHeader}>
            <Image
              source={require("../../../../assets/robot.png")}
              style={styles.robot}
            />
            <Text style={styles.predictionTitle}>
              Maya’s FUSE Rate Prediction
            </Text>
          </View>

          <View style={styles.rateCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.smallLabel}>Current USD → Naira</Text>
              <Text style={styles.rateText}>1,390.00</Text>
              <Text style={styles.redText}>-2.3% from yesterday</Text>
            </View>

            <View style={styles.rightRateBlock}>
              <Text style={styles.smallLabel}>FUSE Predicted (3 days)</Text>
              <Text style={styles.rateText}>1,410.00</Text>
              <Text style={styles.greenText}>+1.8% improvement</Text>
            </View>
          </View>

          <View style={styles.recommendCard}>
            <Image
              source={require("../../../../assets/robot.png")}
              style={styles.smallRobot}
            />
            <Text style={styles.recommendText}>
              Maya recommends: Wait 2-3 days for better rates, or send now with
              our FUSE rate protection guarantee.
            </Text>
          </View>
        </ImageBackground>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: responsiveHeight(2),
            marginHorizontal: responsiveWidth(5),
          }}
        >
          <MaterialCommunityIcons
            name="pencil-outline"
            size={18}
            color="black"
          />
          <Text style={[styles.sectionTitle, { marginLeft: 8 }]}>
            Smart International Transfer
          </Text>
        </View>

        <Text
          style={[
            styles.youSend,
            {
              marginHorizontal: responsiveWidth(5),
              marginTop: responsiveHeight(1.5),
            },
          ]}
        >
          You Send
        </Text>

        <View style={styles.sendBox}>
          <View style={styles.amountRow}>
            <Text style={styles.amount}>2,000</Text>

            <View style={styles.currencyBox}>
              <Image
                source={require("../../../../assets/usa.png")}
                style={styles.flag}
              />
              <Text style={styles.currencyText}>USD</Text>

              <Feather
                name="chevron-down"
                size={responsiveFontSize(2)}
                color="#1F2A56"
                style={{ marginLeft: 5 }}
              />
            </View>
          </View>
        </View>

        <View style={styles.exchangeCard}>
          <View>
            <Text style={styles.exchangeLabel}>Exchange Rate:</Text>
            <Text style={styles.exchangeRate}>1 USD = 1,450.00 Naira</Text>
            <Text style={styles.optimizedFee}>FUSE Optimized Fee:</Text>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.savings}>+ $4.01</Text>
            <Text style={styles.saveLabel}>vs standard rate</Text>
            <Text style={styles.fee}>-$2.99</Text>
          </View>
        </View>

        <Text style={styles.selectionTitle}>FUSE Optimized Fee Selection</Text>

        <View style={styles.recipientCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.recipientName}>
              Abayomi <Text style={{ color: "#666" }}>(Nigeria)</Text>
            </Text>
            <Text style={styles.recipientSub}>Moniepoint: ****4567</Text>
          </View>

          <View style={styles.rightSideColumn}>
            <TouchableOpacity style={styles.refreshCircle}>
              <Feather
                name="refresh-cw"
                size={responsiveFontSize(1.2)}
                color="#1F2A56"
              />
            </TouchableOpacity>

            <Text style={styles.lastSentRight}>Last sent: 2 weeks ago</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.addRecipientRow}>
          <Text style={styles.addRecipientText}>Add new recipient</Text>
          <Feather name="plus" size={responsiveFontSize(2)} color="#1F2A56" />
        </TouchableOpacity>

        <View style={styles.featureSection}>
          <Text style={styles.featureTitle}>FUSE Enhanced Features</Text>
          <Text style={styles.featureItem}>
            • FUSE rate protection for 24 hours
          </Text>
          <Text style={styles.featureItem}>
            • Automatic retry if rate improves
          </Text>
          <Text style={styles.featureItem}>• Fraud detection & prevention</Text>
          <Text style={styles.featureItem}>
            • Smart delivery time optimization
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ReviewSend")}
        >
          <Image
            source={require("../../../../assets/robot.png")}
            style={styles.buttonRobot}
          />
          <Text style={styles.buttonText}>Send with FUSE Optimization</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FuseRemittance;

const styles = StyleSheet.create({
  container: { flex: 1 },

  headerTitle: {
    textAlign: "center",
    fontSize: responsiveFontSize(2),
    fontFamily: "Manrope-SemiBold",
    marginTop: responsiveHeight(5),
  },

  predictionContainer: {
    marginHorizontal: responsiveWidth(5),
    padding: moderateScale(15),
    borderRadius: moderateScale(12),
    backgroundColor: "#1F2A56",
    marginTop: responsiveHeight(3),
  },

  predictionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: responsiveHeight(2),
  },

  robot: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    marginRight: responsiveWidth(2),
    resizeMode: "contain",
  },

  predictionTitle: {
    color: "#fff",
    fontSize: responsiveFontSize(1.8),
    fontFamily: "Manrope-SemiBold",
  },

  rateCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: moderateScale(12),
    borderRadius: moderateScale(10),
    marginBottom: responsiveHeight(1.5),
  },

  rightRateBlock: {
    flex: 1,
    alignItems: "flex-end",
  },

  recommendCard: {
    backgroundColor: "#fff",
    padding: moderateScale(12),
    borderRadius: moderateScale(10),
  },

  smallRobot: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    marginBottom: responsiveHeight(1),
    resizeMode: "contain",
  },

  smallLabel: {
    fontSize: responsiveFontSize(1.3),
    color: "#666",
    fontFamily: "Manrope-Medium",
  },

  rateText: {
    fontSize: responsiveFontSize(2),
    fontFamily: "Manrope-Bold",
  },

  redText: {
    fontSize: responsiveFontSize(1.3),
    fontFamily: "Manrope-Medium",
  },

  greenText: {
    fontSize: responsiveFontSize(1.3),
    fontFamily: "Manrope-Medium",
  },

  recommendText: {
    fontSize: responsiveFontSize(1.3),
    fontFamily: "Manrope-Medium",
  },

  sectionTitle: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: "Manrope-Medium",
  },

  sendBox: {
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(1),
    backgroundColor: "#1e1e1e0f",
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
  },

  youSend: {
    fontSize: responsiveFontSize(1.4),
    color: "#000",
    fontFamily: "Manrope-Bold",
  },

  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  amount: {
    fontSize: responsiveFontSize(2.3),
    fontFamily: "Manrope-Bold",
  },

  currencyBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  flag: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    marginRight: responsiveWidth(1.5),
  },

  currencyText: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: "Manrope-Bold",
  },

  exchangeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(2),
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    borderColor: "#1E1E1E",
    borderWidth: 1,
  },

  exchangeLabel: {
    fontSize: responsiveFontSize(1),
    color: "#666",
    fontFamily: "Manrope-Bold",
  },

  exchangeRate: {
    fontSize: responsiveFontSize(1),
  },

  optimizedFee: {
    fontSize: responsiveFontSize(1.4),
    paddingTop: responsiveHeight(1.8),
    fontFamily: "Manrope-SemiBold",
  },

  savings: {
    color: "green",
    fontFamily: "Manrope-SemiBold",
    fontSize: responsiveFontSize(2.2),
  },

  saveLabel: {
    fontSize: responsiveFontSize(1.2),
    color: "#888",
    fontFamily: "Manrope-SemiBold",
  },

  fee: {
    color: "red",
    marginTop: responsiveHeight(0.5),
    fontFamily: "Manrope-SemiBold",
  },

  selectionTitle: {
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(3),
    fontSize: responsiveFontSize(1.6),
    fontFamily: "Manrope-SemiBold",
  },

  recipientCard: {
    flexDirection: "row",
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(1.5),
    backgroundColor: "#ffffff51",
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
  },

  recipientName: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: "Manrope-SemiBold",
  },

  recipientSub: {
    fontSize: responsiveFontSize(1.4),
    color: "#666",
  },

  rightSideColumn: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  lastSentRight: {
    fontSize: responsiveFontSize(1.2),
    color: "#999",
    marginTop: responsiveHeight(1),
    textAlign: "right",
  },

  refreshCircle: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    borderRadius: responsiveWidth(5),
    borderWidth: 1,
    borderColor: "#1F2A56",
    justifyContent: "center",
    alignItems: "center",
  },

  addRecipientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(2),
  },

  addRecipientText: {
    fontSize: responsiveFontSize(1.5),
    color: "#1F2A56",
    fontFamily: "Manrope-SemiBold",
  },

  featureSection: {
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(3),
  },

  featureTitle: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: "Manrope-SemiBold",
    marginBottom: responsiveHeight(1),
  },

  featureItem: {
    fontSize: responsiveFontSize(1.4),
    marginBottom: responsiveHeight(0.5),
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: responsiveWidth(5),
    marginVertical: responsiveHeight(4),
    backgroundColor: "#1F2A50",
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
  },

  buttonRobot: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    marginRight: responsiveWidth(2),
    resizeMode: "contain",
  },

  buttonText: {
    color: "#fff",
    fontSize: responsiveFontSize(1.8),
    fontFamily: "Manrope-SemiBold",
  },
});
