import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale } from "react-native-size-matters";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import Fonts from "../../constants/Fonts";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Transaction {
  name: string;
  amount: string;
  type: "credit" | "debit" | "neutral";
}

type RootStackParamList = {
  HistoryScreen: undefined;
  HistoryDetail: { item: Transaction };
};

import { useLanguage } from "../../context/LanguageContext";

const HistoryScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { t, isRTL } = useLanguage();

  const todayTransactions: Transaction[] = [
    { name: "Arlene Mccoy", amount: "$ 1.7123", type: "neutral" },
    { name: "Arlene Mccoy", amount: "- $500", type: "debit" },
    { name: "Arlene Mccoy", amount: "$ 1.7123", type: "neutral" },
    { name: "Arlene Mccoy", amount: "+ $500", type: "credit" },
  ];

  const yesterdayTransactions: Transaction[] = [
    { name: "Arlene Mccoy", amount: "$ 1.7123", type: "neutral" },
    { name: "Arlene Mccoy", amount: "- $500", type: "debit" },
    { name: "Arlene Mccoy", amount: "+ $500", type: "credit" },
    { name: "Arlene Mccoy", amount: "+ $500", type: "credit" },
    { name: "Arlene Mccoy", amount: "+ $500", type: "credit" },
  ];

  const oldTransactions: Transaction[] = [
    { name: "Arlene Mccoy", amount: "+ $500", type: "credit" },
    { name: "Arlene Mccoy", amount: "+ $500", type: "credit" },
  ];

  const handleNavigation = (item: Transaction) => {
    navigation.navigate("HistoryDetail", { item });
  };

  const renderIcon = (type: string) => {
    if (type === "debit") {
      return (
        <View style={[styles.iconCircle, { backgroundColor: "#FFE5E5", marginRight: isRTL ? 0 : responsiveWidth(3), marginLeft: isRTL ? responsiveWidth(3) : 0 }]}>
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
        <View style={[styles.iconCircle, { backgroundColor: "#CFF7E2", marginRight: isRTL ? 0 : responsiveWidth(3), marginLeft: isRTL ? responsiveWidth(3) : 0 }]}>
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
        style={[styles.iconCircle, { borderColor: "#DADADA", borderWidth: 1, marginRight: isRTL ? 0 : responsiveWidth(3), marginLeft: isRTL ? responsiveWidth(3) : 0 }]}
      >
        <FontAwesome5 name="sync" size={moderateScale(14)} color="#000000" />
      </View>
    );
  };

  const renderAmountStyle = (type: string) => {
    if (type === "debit") return { color: "#FB002E" };
    if (type === "credit") return { color: "#34A853" };
    return { color: "#000000" };
  };

  const renderSection = (title: string, data: Transaction[]) => (
    <>
      <Text style={[styles.sectionTitle, { textAlign: isRTL ? 'right' : 'left' }]}>{title}</Text>

      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
          activeOpacity={0.7}
          onPress={() => handleNavigation(item)}
        >
          <View style={[styles.leftRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            {renderIcon(item.type)}
            <Text style={styles.name}>{item.name}</Text>
          </View>

          <Text style={[styles.amount, renderAmountStyle(item.type)]}>
            {item.amount}
          </Text>
        </TouchableOpacity>
      ))}
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t("history.title")}</Text>
        </View>

        {renderSection(t("history.today"), todayTransactions)}
        {renderSection(t("history.yesterday"), yesterdayTransactions)}
        {renderSection("12th May, 2025", oldTransactions)}

        <View style={{ height: responsiveHeight(4) }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: responsiveWidth(5),
  },

  header: {
    alignItems: "center",
    marginBottom: responsiveHeight(3),
    marginTop: responsiveHeight(5),
  },

  headerTitle: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: Fonts.bold,
    color: "#000",
  },

  sectionTitle: {
    fontSize: responsiveFontSize(1.7),
    color: "#7A7A7A",
    marginBottom: responsiveHeight(1.5),
    fontFamily: Fonts.semiBold,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: responsiveHeight(2),
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
    fontFamily: Fonts.bold,
    color: "#111111",
  },

  amount: {
    fontSize: responsiveFontSize(2),
    fontFamily: Fonts.semiBold,
  },
});
