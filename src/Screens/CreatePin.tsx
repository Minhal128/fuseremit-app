import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { moderateScale } from "react-native-size-matters";
import { Feather, Ionicons } from "@expo/vector-icons";
import PinSuccessModal from "../Components/Login/PinSuccessModal";

interface Props {
  navigation: any;
}

const CreatePin = ({ navigation }: Props) => {
  const [pin, setPin] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handlePress = (num: string) => {
    if (pin.length < 6) {
      setPin(pin + num);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  useEffect(() => {
    if (pin.length === 6) {
      const timer = setTimeout(() => {
        setModalVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [pin]);

  const renderDot = (index: number) => {
    const filled = index < pin.length;

    return (
      <View
        key={index}
        style={[
          styles.dot,
          {
            backgroundColor: filled ? "#22C55E" : "#E5E7EB",
          },
        ]}
      />
    );
  };

  const NumberButton = ({ value }: { value: string }) => (
    <TouchableOpacity
      style={styles.key}
      activeOpacity={0.7}
      onPress={() => handlePress(value)}
    >
      <Text style={styles.keyText}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={moderateScale(22)} />
        </TouchableOpacity>

        <Image
          source={require("../../assets/login.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={{ width: moderateScale(24) }} />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Create your Pin</Text>
        <Text style={styles.subtitle}>Please confirm your PIN</Text>
      </View>

      <View style={styles.dotsContainer}>
        {[0, 1, 2, 3, 4, 5].map(renderDot)}
      </View>

      <View style={styles.keypadContainer}>
        <View style={styles.row}>
          <NumberButton value="1" />
          <NumberButton value="2" />
          <NumberButton value="3" />
        </View>

        <View style={styles.row}>
          <NumberButton value="4" />
          <NumberButton value="5" />
          <NumberButton value="6" />
        </View>

        <View style={styles.row}>
          <NumberButton value="7" />
          <NumberButton value="8" />
          <NumberButton value="9" />
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.key} activeOpacity={0.7}>
            <Image
              source={require("../../assets/face.png")}
              style={{ width: moderateScale(26), height: moderateScale(26) }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <NumberButton value="0" />

          <TouchableOpacity style={styles.key} onPress={handleDelete}>
            <Ionicons
              name="backspace-outline"
              size={moderateScale(26)}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.forgot}>Forgot your PIN?</Text>
        <Text style={styles.logout}>Logout</Text>
      </View>

      {/* Modal */}
      <PinSuccessModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default CreatePin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(6),
  },

  logo: {
    width: responsiveWidth(50),
    height: responsiveHeight(5),
  },

  header: {
    marginTop: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(6),
  },

  title: {
    fontSize: responsiveFontSize(2.4),
    fontFamily: "Manrope-SemiBold",
    color: "#000",
  },

  subtitle: {
    fontSize: responsiveFontSize(1.3),
    color: "#6B7280",
    marginTop: responsiveHeight(0.7),
    fontFamily: "Manrope-SemiBold",
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: responsiveHeight(6),
  },

  dot: {
    width: moderateScale(18),
    height: moderateScale(18),
    borderRadius: moderateScale(50),
    marginHorizontal: moderateScale(10),
  },

  keypadContainer: {
    marginTop: responsiveHeight(7),
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: responsiveHeight(3),
  },

  key: {
    width: responsiveWidth(22),
    height: responsiveWidth(10),
    justifyContent: "center",
    alignItems: "center",
  },

  keyText: {
    fontSize: responsiveFontSize(3.5),
    color: "#000",
    fontFamily: "Manrope-Bold",
  },

  footer: {
    position: "absolute",
    bottom: responsiveHeight(8),
    left: responsiveWidth(6),
    right: responsiveWidth(6),
    flexDirection: "row",
    justifyContent: "space-between",
  },

  forgot: {
    color: "#27AE60",
    fontSize: responsiveFontSize(1.6),
    fontFamily: "Manrope-SemiBold",
  },

  logout: {
    color: "#FB002E",
    fontSize: responsiveFontSize(1.6),
    fontFamily: "Manrope-SemiBold",
  },
});
