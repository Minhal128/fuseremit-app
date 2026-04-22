import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale } from "react-native-size-matters";
import { Feather, Ionicons } from "@expo/vector-icons";
import Fonts from "../../constants/Fonts";

interface AlertItem {
  title: string;
  type: "ai" | "success" | "failed";
  time: string;
}

import { useLanguage } from "../../context/LanguageContext";

const AlertsScreen: React.FC = () => {
  const { t, isRTL } = useLanguage();
  
  const alerts: AlertItem[] = [
    {
      title: "FUSE AI detected Optimal exchange rate for your mexico transfer",
      type: "ai",
      time: "2 mins ago",
    },
    {
      title: "Transfer of $250 to Sade has been completed",
      type: "success",
      time: "2 mins ago",
    },
    {
      title: "Transfer of $250 to Aileen Failed",
      type: "failed",
      time: "2 mins ago",
    },
  ];

  const renderIcon = (type: string) => {
    if (type === "success") {
      return (
        <View style={[styles.iconCircle, { backgroundColor: "#CFF7E2", marginRight: isRTL ? 0 : responsiveWidth(3), marginLeft: isRTL ? responsiveWidth(3) : 0 }]}>
          <Feather
            name="arrow-up-right"
            size={moderateScale(18)}
            color="#34A853"
          />
        </View>
      );
    }

    if (type === "failed") {
      return (
        <View style={[styles.iconCircle, { backgroundColor: "#FAD4D8", marginRight: isRTL ? 0 : responsiveWidth(3), marginLeft: isRTL ? responsiveWidth(3) : 0 }]}>
          <Ionicons name="close" size={moderateScale(18)} color="#E53935" />
        </View>
      );
    }

    return (
      <View style={[styles.iconCircle, { marginRight: isRTL ? 0 : responsiveWidth(3), marginLeft: isRTL ? responsiveWidth(3) : 0 }]}>
        <Image
          source={require("../../../assets/robot.png")}
          style={styles.robotImage}
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t("alerts.title")}</Text>
        </View>

        {alerts.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card} activeOpacity={0.8}>
            <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              {renderIcon(item.type)}

              <View style={[styles.contentWrapper, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <Text style={[styles.alertText, { textAlign: isRTL ? 'right' : 'left' }]}>{item.title}</Text>

                <View style={[styles.rightMeta, { alignItems: isRTL ? 'flex-start' : 'flex-end' }]}>
                  <Text style={styles.aiText}>{t("alerts.aiLabel")}</Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: responsiveHeight(4) }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlertsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
  },

  header: {
    alignItems: "center",
    marginTop: responsiveHeight(5),
    marginBottom: responsiveHeight(3),
  },

  headerTitle: {
    fontSize: responsiveFontSize(2.3),
    fontFamily: Fonts.bold,
    color: "#000",
  },

  card: {
    backgroundColor: "#ffffff43",
    borderRadius: moderateScale(14),
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  iconCircle: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(12),
    justifyContent: "center",
    alignItems: "center",
    marginRight: responsiveWidth(3),
    backgroundColor: "#E9EDF5",
  },

  robotImage: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
  },

  contentWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  alertText: {
    flex: 1,
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.semiBold,
    color: "#111",
    paddingRight: responsiveWidth(2),
  },

  rightMeta: {
    alignItems: "flex-end",
  },

  aiText: {
    fontSize: responsiveFontSize(1.3),
    color: "#203A73",
    fontFamily: Fonts.semiBold,
  },

  timeText: {
    fontSize: responsiveFontSize(1.3),
    color: "#000000",
    fontFamily: Fonts.regular,
    marginTop: responsiveHeight(2),
  },
});
