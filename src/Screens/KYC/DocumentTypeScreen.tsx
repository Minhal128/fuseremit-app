import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { moderateScale } from "react-native-size-matters";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const DocumentTypeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={moderateScale(22)} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Select Document Type</Text>

        <TouchableOpacity>
          <Ionicons
            name="notifications"
            size={moderateScale(22)}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>Nigeria</Text>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardText}>Passport</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardText}>ID card</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardText}>Driver’s license</Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }} />

      <TouchableOpacity
        style={styles.verifyButton}
        onPress={() => navigation.navigate("SelectDocument")}
      >
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DocumentTypeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: responsiveWidth(5),
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: responsiveHeight(5),
  },

  headerTitle: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: "Manrope-Bold",
    color: "#000",
  },

  description: {
    marginTop: responsiveHeight(5),
    fontSize: responsiveFontSize(1.8),
    color: "#1E1E1E",
    lineHeight: moderateScale(22),
    fontFamily: "Manrope-Medium",
    marginBottom: responsiveHeight(2),
  },

  card: {
    marginTop: responsiveHeight(2),
    backgroundColor: "#0B3963",
    borderRadius: moderateScale(8),
    paddingVertical: responsiveHeight(2),
    justifyContent: "center",
    alignItems: "center",
  },

  cardText: {
    color: "#fff",
    fontSize: responsiveFontSize(1.9),
    fontFamily: "Manrope-SemiBold",
    textAlign: "center",
  },

  verifyButton: {
    backgroundColor: "#0B3963",
    borderRadius: moderateScale(10),
    paddingVertical: responsiveHeight(2),
    alignItems: "center",
    marginBottom: responsiveHeight(8),
  },

  verifyText: {
    color: "#fff",
    fontSize: responsiveFontSize(2),
    fontFamily: "Manrope-Bold",
  },
});
