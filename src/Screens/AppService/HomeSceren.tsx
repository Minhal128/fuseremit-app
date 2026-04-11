import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale } from "react-native-size-matters";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ButtonsScreen from "./Home/ButtonsScreen";
import RecentTransactions from "./Home/RecentTransactions";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#F4F5F7" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: responsiveHeight(3) }}
      >
        <View style={{ height: responsiveHeight(45) }}>
          <ImageBackground
            source={require("../../../assets/mainbg.png")}
            style={{ flex: 1 }}
            resizeMode="cover"
          >
            <View style={styles.contentWrapper}>
              <View style={styles.topSection}>
                <View>
                  <Text style={styles.balanceLabel}>Total Balance</Text>
                  <Text style={styles.balanceAmount}>$2,450.75</Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("MayaAI")}>
                  <View style={styles.robotCircle}>
                    <Image
                      source={require("../../../assets/robot.png")}
                      style={styles.robotImage}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={[styles.buttonRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <TouchableOpacity
                  style={styles.buttonBox}
                  onPress={() => navigation.navigate("FuseSend")}
                >
                  <View style={[styles.iconWrapper, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                    <Image
                      source={require("../../../assets/robot.png")}
                      style={[styles.fuseIcon, { [isRTL ? 'marginLeft' : 'marginRight']: responsiveWidth(2) }]}
                    />
                    <Text style={[styles.buttonText, { textAlign: isRTL ? 'right' : 'left' }]}>{t("home.fuseSend")}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonBox}
                  onPress={() => navigation.navigate("FuseSend")}
                >
                  <View style={[styles.iconWrapper, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                    <FontAwesome
                      name="send"
                      size={moderateScale(19)}
                      style={{ [isRTL ? 'marginLeft' : 'marginRight']: responsiveWidth(3) }}
                      color="#fff"
                    />
                    <Text style={[styles.buttonText, { textAlign: isRTL ? 'right' : 'left' }]}>{t("common.send")}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonBox}
                  onPress={() => navigation.navigate("AddMoney")}
                >
                  <View style={[styles.iconWrapper, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                    <FontAwesome5
                      name="plus"
                      size={moderateScale(19)}
                      style={{ [isRTL ? 'marginLeft' : 'marginRight']: responsiveWidth(3) }}
                      color="#fff"
                    />
                    <Text style={[styles.buttonText, { textAlign: isRTL ? 'right' : 'left' }]}>{t("home.addMoney")}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.card}>
                <Text style={[styles.cardTitle, { textAlign: isRTL ? 'right' : 'left' }]}>{t("home.aiInsights")}</Text>

                <Text style={styles.cardSub}>
                  Maya analyzed your financial patterns
                </Text>

                <View style={styles.bulletRow}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    FUSE optimization saved you $45 this month on transfer fees
                  </Text>
                </View>

                <View style={styles.bulletRow}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    No suspicious activity detected in your recent transactions
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>

        <ButtonsScreen />
        <RecentTransactions />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(1.5),
    gap: responsiveHeight(2.5),
  },

  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  balanceLabel: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(2),
    fontFamily: "Manrope-SemiBold",
  },

  balanceAmount: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(4),
    fontFamily: "Manrope-Bold",
  },

  identityLoadingRow: {
    marginTop: responsiveHeight(0.8),
    flexDirection: "row",
    alignItems: "center",
  },

  identityLoadingText: {
    color: "#E1E7F0",
    marginLeft: responsiveWidth(2),
    fontSize: responsiveFontSize(1.4),
    fontFamily: "Manrope-SemiBold",
  },

  identityText: {
    marginTop: responsiveHeight(0.8),
    color: "#DCE8FF",
    fontSize: responsiveFontSize(1.4),
    fontFamily: "Manrope-SemiBold",
  },

  identityErrorText: {
    marginTop: responsiveHeight(0.4),
    color: "#FFD3D3",
    fontSize: responsiveFontSize(1.2),
    fontFamily: "Manrope-SemiBold",
    maxWidth: responsiveWidth(58),
  },

  robotCircle: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(9),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  robotImage: {
    width: responsiveWidth(7),
    height: responsiveWidth(7),
    resizeMode: "contain",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  buttonBox: {
    width: responsiveWidth(27),
    borderWidth: responsiveWidth(0.3),
    borderColor: "#FFFFFF",
    borderRadius: moderateScale(12),
    paddingVertical: responsiveWidth(3.2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff49",
  },

  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  fuseIcon: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    resizeMode: "contain",
    marginRight: responsiveWidth(2),
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(1.8),
    fontFamily: "Manrope-SemiBold",
  },

  card: {
    backgroundColor: "#ffffff49",
    borderRadius: moderateScale(12),
    paddingVertical: responsiveWidth(2),
    borderWidth: 1,
    borderColor: "#FFFFFF",
    paddingHorizontal: responsiveWidth(5),
  },

  cardTitle: {
    color: "#1F2A50",
    fontSize: responsiveFontSize(1.6),
    fontFamily: "Manrope-SemiBold",
    marginBottom: responsiveHeight(1),
  },

  cardSub: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(1.5),
    marginBottom: responsiveHeight(1),
    fontFamily: "Manrope-SemiBold",
  },

  bulletRow: {
    flexDirection: "row",
  },

  bullet: {
    color: "#FFFFFF",
    marginRight: moderateScale(6),
  },

  bulletText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: responsiveFontSize(1.3),
    fontFamily: "Manrope-SemiBold",
  },
});
