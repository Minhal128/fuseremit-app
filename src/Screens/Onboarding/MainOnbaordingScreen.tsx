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
import { moderateScale, scale } from "react-native-size-matters";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  OnboardingTransactionPin: undefined;
  OnboardingClassic: undefined;
  OnboardingPremium: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MainOnbaordingScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* TopBar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={moderateScale(22)} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Get Started</Text>

        <TouchableOpacity>
          <Ionicons name="notifications" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          Complete these tasks to fully utilize your FuseRemit account.
        </Text>
      </View>

      {/* Task */}
      <View style={styles.taskContainer}>
        {renderTask("Create An Account", true)}

        {renderTask("Create Your Transaction PIN", false, () =>
          navigation.navigate("OnboardingTransactionPin"),
        )}

        {renderTask("Upgrade to FuseRemit Classic", false, () =>
          navigation.navigate("OnboardingClassic"),
        )}

        {renderTask("Upgrade to FuseRemit Premium", false, () =>
          navigation.navigate("OnboardingPremium"),
        )}
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.homeButton}>
          <Text style={styles.homeButtonText}>Go To Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const renderTask = (
  title: string,
  completed: boolean,
  onPress?: () => void,
) => {
  const isClickable = !!onPress;

  return (
    <TouchableOpacity
      activeOpacity={isClickable ? 0.7 : 1}
      onPress={onPress}
      disabled={!isClickable}
      style={styles.taskItem}
    >
      <Ionicons
        name="checkmark"
        size={moderateScale(20)}
        color={completed ? "#27AE60" : "#0000008a"}
        style={{ marginRight: responsiveWidth(3) }}
      />
      <Text style={styles.taskText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MainOnbaordingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: responsiveWidth(5),
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: responsiveHeight(5),
  },

  headerTitle: {
    fontSize: responsiveFontSize(2.5),
    fontFamily: "Manrope-SemiBold",
    color: "#000",
  },

  descriptionContainer: {
    marginTop: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(5),
  },

  descriptionText: {
    textAlign: "center",
    fontSize: responsiveFontSize(1.8),
    color: "#1E1E1E",
    fontFamily: "Manrope-SemiBold",
  },

  taskContainer: {
    marginTop: responsiveHeight(10),
    paddingHorizontal: scale(10),
  },

  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: responsiveHeight(6),
    fontFamily: "Manrope-SemiBold",
  },

  taskText: {
    fontSize: responsiveFontSize(2),
    color: "#333",
  },

  bottomContainer: {
    position: "absolute",
    bottom: responsiveHeight(8),
    left: 0,
    right: 0,
    alignItems: "center",
  },

  homeButton: {
    width: responsiveWidth(90),
    height: responsiveHeight(6.5),
    backgroundColor: "#0B3963",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(10),
  },

  homeButtonText: {
    color: "#fff",
    fontSize: responsiveFontSize(1.8),
    fontFamily: "Manrope-SemiBold",
  },
});
