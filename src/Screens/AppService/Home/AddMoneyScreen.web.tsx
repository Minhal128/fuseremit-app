import React from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AddMoneyScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E2A5A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Money</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Ionicons name="card-outline" size={64} color="#9CA3AF" />
        <Text style={styles.title}>Not Available on Web</Text>
        <Text style={styles.subtitle}>
          The Add Money feature uses native payment processing and is only
          available on the iOS and Android apps.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AddMoneyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: "Manrope-Bold",
    color: "#1E2A5A",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(10),
    gap: responsiveHeight(2),
  },
  title: {
    fontSize: responsiveFontSize(2.2),
    fontFamily: "Manrope-Bold",
    color: "#1E2A5A",
  },
  subtitle: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: "Manrope-Regular",
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },
});
