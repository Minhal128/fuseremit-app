import React, { useState } from "react";
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
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale } from "react-native-size-matters";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MayaAIScreen: React.FC = () => {
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F2F7" }}>
      <StatusBar barStyle="light-content" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: responsiveHeight(15),
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{ height: responsiveHeight(30) }}>
              <ImageBackground
                source={require("../../../../assets/mainbg.png")}
                style={{ flex: 1 }}
                resizeMode="cover"
              >
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="close-circle" size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.headerContent}>
                  <View style={styles.robotCircle}>
                    <Image
                      source={require("../../../../assets/robot.png")}
                      style={styles.robotImage}
                    />
                  </View>

                  <Text style={styles.askText}>Ask Maya</Text>

                  <Text style={styles.description}>
                    Hello, I am MAYA AI, a highly advanced Assistant to help
                    with your everyday needs..
                  </Text>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>FUSE Rates</Text>
                <Text style={styles.cardSub}>
                  I'll find the most competitive exchange rates for your
                  corridor right now.
                </Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Save Money</Text>
                <Text style={styles.cardSub}>
                  Let me analyze your transfer history to find ways you can save
                  on transaction fees.
                </Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Instant Transfer Status</Text>
                <Text style={styles.cardSub}>
                  Ask me 'Where is my money?' for a real-time update on your
                  active transactions.
                </Text>
              </View>
            </View>
          </ScrollView>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.inputWrapper}>
              <View style={styles.inputRow}>
                <TouchableOpacity style={styles.plusButton}>
                  <Entypo name="plus" size={24} color="#203A73" />
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Type your message..."
                    placeholderTextColor="#7A7A7A"
                    value={message}
                    onChangeText={setMessage}
                    style={styles.input}
                  />

                  <TouchableOpacity style={styles.sendButton}>
                    <FontAwesome name="send" size={14} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default MayaAIScreen;

const styles = StyleSheet.create({
  headerContent: {
    flex: 1,
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveHeight(6),
  },

  closeButton: {
    position: "absolute",
    top: responsiveHeight(4),
    right: responsiveWidth(5),
    zIndex: 10,
  },

  robotCircle: {
    width: responsiveWidth(14),
    height: responsiveWidth(14),
    borderRadius: responsiveWidth(20),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  robotImage: {
    width: responsiveWidth(9),
    height: responsiveWidth(9),
    resizeMode: "contain",
  },

  askText: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(2.5),
    fontFamily: "KronaOne-Regular",
    marginBottom: responsiveHeight(1),
    marginTop: responsiveHeight(1.2),
  },

  description: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(2),
    fontFamily: "KronaOne-Regular",
  },

  cardContainer: {
    paddingTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
    gap: responsiveHeight(2),
  },

  card: {
    backgroundColor: "#1f2a5017",
    borderRadius: moderateScale(14),
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
    borderWidth: 1,
    borderColor: "#1F2A50",
  },

  cardTitle: {
    fontSize: responsiveFontSize(2),
    fontFamily: "Manrope-Bold",
    color: "#000000",
    marginBottom: responsiveHeight(0.5),
  },

  cardSub: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: "Manrope-SemiBold",
    color: "#000000",
  },

  inputWrapper: {
    width: "100%",
    paddingHorizontal: responsiveWidth(4),
    paddingBottom: responsiveHeight(2),
    backgroundColor: "#F2F2F7",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  plusButton: {
    marginRight: responsiveWidth(3),
  },

  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(30),
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(0.5),
  },

  input: {
    flex: 1,
    fontSize: responsiveFontSize(1.7),
    fontFamily: "Manrope-SemiBold",
    color: "#000",
  },

  sendButton: {
    width: responsiveWidth(9),
    height: responsiveWidth(9),
    borderRadius: responsiveWidth(10),
    backgroundColor: "#203A73",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: responsiveWidth(2),
  },
});
