import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale } from "react-native-size-matters";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Fonts from "../../../constants/Fonts";

const ButtonsScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const cardHeight = responsiveHeight(16);

  const buttons = [
    {
      title: "FUSE\nSEND",
      image: require("../../../../assets/robot.png"),
      screen: "FuseSendVoice",
    },
    {
      title: "SEND",
      image: require("../../../../assets/send.png"),
      screen: "FuseSend",
    },
    {
      title: "FUSE\nREMITTANCE",
      image: require("../../../../assets/fuse.png"),
      screen: "FuseRemittance",
    },
    {
      title: "ANALYTICS",
      image: require("../../../../assets/analytics.png"),
      screen: "Analytics",
    },
  ];

  const handleNavigation = (screen: string) => {
    if (screen === "FuseRemittance") {
      navigation.navigate("FuseSend", {
        screen: "FuseRemittance",
      });
    } else if (screen === "FuseSendVoice") {
      navigation.navigate("FuseSend", {
        screen: "FuseSendVoice",
      });
    } else if (screen === "Analytics") {
      navigation.navigate("FuseSend", {
        screen: "Analytics",
      });
    } else if (screen === "FuseSend") {
      navigation.navigate("FuseSend");
    } else {
      navigation.navigate(screen as never);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gridContainer}>
        {buttons.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { height: cardHeight }]}
            activeOpacity={0.8}
            onPress={() => handleNavigation(item.screen)}
          >
            <Image source={item.image} style={styles.iconImage} />
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default ButtonsScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(3),
  },

  gridContainer: {
    width: responsiveWidth(90),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: responsiveWidth(42),
    backgroundColor: "#203a731a",
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: "#1F2A50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: responsiveHeight(3),
  },

  iconImage: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    resizeMode: "contain",
    marginBottom: responsiveHeight(1),
  },

  text: {
    fontSize: responsiveFontSize(2),
    fontFamily: Fonts.bold,
    color: "#1D2B53",
    textAlign: "center",
    lineHeight: responsiveFontSize(3),
  },
});
