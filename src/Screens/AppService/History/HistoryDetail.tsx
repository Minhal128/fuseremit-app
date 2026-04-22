import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { moderateScale } from "react-native-size-matters";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Fonts from "../../../constants/Fonts";

interface Props {
  navigation: any;
}

const HistoryDetail = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={moderateScale(18)} color="#000" />
        </TouchableOpacity>

        <Text style={styles.topTitle}>TRANSACTION DETAILS</Text>

        <View style={{ width: moderateScale(20) }} />
      </View>

      <View style={styles.mainContainer}>
        <ImageBackground
          source={require("../../../../assets/receipt.png")}
          resizeMode="stretch"
          style={styles.bgImage}
        >
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={moderateScale(22)} color="#fff" />
          </View>

          <View style={styles.amountRow}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.smallLabel}>You sent Abeni</Text>
              <Text style={styles.amountText}>$2,000.00</Text>
            </View>
          </View>

          <View style={styles.dashedLine} />

          {renderRow("Recipient", "Abeni Adeyemi")}
          {renderRow("Bank Name", "GTB")}
          {renderRow("Bank Number", "0405271456")}
          {renderRow("Amount Sent", "$2,000.00")}
          {renderRow("Amount Received", "N 2,410,000.00")}
          {renderRow("Transaction Type", "Transfer")}
          {renderRow("Fees", "$40")}
          {renderRow("Transaction Type", "Transfer")}

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}>
              <FontAwesome5
                name="share-alt"
                size={20}
                style={{ marginRight: responsiveWidth(2) }}
                color="white"
              />
              <Text style={styles.buttonText}>Share Receipt</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Ionicons
                name="chatbubble"
                style={{ marginRight: responsiveWidth(2) }}
                size={20}
                color="white"
              />
              <Text style={styles.buttonText}>Report an Issue</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default HistoryDetail;

const renderRow = (label: string, value: string) => {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(5),
    marginBottom: responsiveHeight(4),
  },

  topTitle: {
    fontSize: responsiveFontSize(2),
    fontFamily: Fonts.bold,
    color: "#000",
  },

  mainContainer: {
    flex: 1,
    paddingTop: responsiveHeight(1),
  },

  bgImage: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(6),
    paddingBottom: responsiveHeight(4),
    borderRadius: moderateScale(20),
    overflow: "hidden",
    height: responsiveHeight(67),
  },

  checkCircle: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "#0B3963",
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(50),
    alignItems: "center",
    justifyContent: "center",
  },

  amountRow: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(2),
  },

  smallLabel: {
    fontSize: responsiveFontSize(1.4),
    color: "#555",
    fontFamily: Fonts.semiBold,
    textAlign: "center",
  },

  amountText: {
    fontSize: responsiveFontSize(4),
    fontFamily: Fonts.bold,
    marginTop: responsiveHeight(0.5),
    color: "#000",
    textAlign: "center",
  },

  dashedLine: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#B0B0B0",
    marginVertical: responsiveHeight(2),
    marginHorizontal: responsiveWidth(3.5),
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: responsiveHeight(1.8),
    paddingHorizontal: responsiveWidth(1),
  },

  rowLabel: {
    fontSize: responsiveFontSize(1.5),
    color: "#444",
    fontFamily: Fonts.semiBold,
  },

  rowValue: {
    fontSize: responsiveFontSize(1.5),
    fontFamily: Fonts.bold,
    color: "#000",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(3.5),
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#123D63",
    paddingVertical: responsiveHeight(2.5),
    width: responsiveWidth(40),
    borderRadius: moderateScale(12),
  },

  buttonText: {
    color: "#fff",
    marginLeft: moderateScale(6),
    fontSize: responsiveFontSize(1.2),
    fontFamily: Fonts.semiBold,
  },
});
