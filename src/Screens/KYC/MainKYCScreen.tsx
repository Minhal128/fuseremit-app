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
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const MainKYCScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={moderateScale(22)} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>KYC</Text>

        <TouchableOpacity>
          <Ionicons
            name="notifications"
            size={moderateScale(22)}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>
        To fully unlock the potential of FuseRemit, you'll need to complete
        identity verification by providing the following:
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("PersonalInformation")}
      >
        <Text style={styles.cardText}>
          Some personal information: your name, date of birth etc.
        </Text>

        <View style={styles.iconRow}>
          <MaterialCommunityIcons
            name="playlist-check"
            size={26}
            color="#fff"
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("DocumentType")}
      >
        <Text style={styles.cardText}>
          A picture of your passport or ID card
        </Text>

        <Ionicons
          name="phone-portrait-outline"
          size={moderateScale(22)}
          color="#fff"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('LivenessVerify')}>
        <Text style={styles.cardText}>Liveness check</Text>

        <MaterialCommunityIcons
          name="emoticon-happy-outline"
          size={moderateScale(22)}
          color="#fff"
        />
      </TouchableOpacity>

      <View style={{ flex: 1 }} />

      <TouchableOpacity
        style={styles.verifyButton}
        onPress={() => navigation.navigate("AppServiceBottomNavigation")}
      >
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MainKYCScreen;

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
    marginBottom: responsiveHeight(6),
  },

  card: {
    marginTop: responsiveHeight(2),
    backgroundColor: "#0B3963",
    borderRadius: moderateScale(8),
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardText: {
    flex: 1,
    color: "#fff",
    fontSize: responsiveFontSize(1.9),
    marginRight: responsiveWidth(3),
    fontFamily: "Manrope-SemiBold",
  },

  iconRow: {
    flexDirection: "row",
    alignItems: "center",
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
