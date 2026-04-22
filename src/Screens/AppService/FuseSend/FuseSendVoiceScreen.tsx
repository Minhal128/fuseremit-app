import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale } from "react-native-size-matters";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Audio } from "expo-av";
import Fonts from "../../../constants/Fonts";

const FuseSendVoiceScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleVoicePress = async () => {
    if (!isRecording) {
      try {
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY,
        );

        setRecording(recording);
        setIsRecording(true);
      } catch (err) {
        console.log("Recording error:", err);
      }
    } else {
      await recording?.stopAndUnloadAsync();
      setRecording(null);
      setIsRecording(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="chevron-left" size={22} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>FUSE SEND</Text>
            <View style={{ width: 22 }} />
          </View>

          <ImageBackground
            source={require("../../../../assets/mainbg.png")}
            style={styles.bgCard}
            imageStyle={{ resizeMode: "contain" }}
          >
            <View style={styles.bgHeader}>
              <Image
                source={require("../../../../assets/robot.png")}
                style={styles.robot}
              />
              <Text style={styles.bgTitle}>Maya’s FUSE Suggestions</Text>
            </View>

            <View style={styles.suggestionCard}>
              <View style={styles.userRow}>
                <View style={styles.avatarCircle}>
                  <Feather
                    name="refresh-cw"
                    size={responsiveFontSize(1.2)}
                    color="#1F2A56"
                  />
                </View>

                <View>
                  <Text style={styles.userName}>Arlene McCoy (Canada)</Text>
                  <Text style={styles.subText}>Monthly active detected</Text>
                </View>
              </View>

              <Text style={styles.price}>$500</Text>
            </View>

            <View style={styles.suggestionCard}>
              <View style={styles.userRow}>
                <View style={styles.avatarCircle}>
                  <Feather
                    name="refresh-cw"
                    size={responsiveFontSize(1.2)}
                    color="#1F2A56"
                  />
                </View>

                <View>
                  <Text style={styles.userName}>Elle Doure (France)</Text>
                  <Text style={styles.subText}>Recent interaction</Text>
                </View>
              </View>

              <Text style={styles.price}>$250</Text>
            </View>
          </ImageBackground>

          <View style={styles.voiceSection}>
            <View style={styles.voiceHeader}>
              <MaterialCommunityIcons
                name="microphone"
                size={22}
                color="black"
              />
              <Text style={styles.voiceHeaderText}>FUSE Voice Command</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.voiceBox,
                isRecording && { backgroundColor: "#fde2e2" },
              ]}
              activeOpacity={0.8}
              onPress={handleVoicePress}
            >
              <View style={styles.voiceCircle}>
                <Feather
                  name="mic"
                  size={responsiveFontSize(3)}
                  color="#1F2A56"
                />
              </View>

              <Text style={styles.voiceText}>
                {isRecording ? "Recording..." : "Tap to Speak"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.manualSection}>
            <View style={styles.manualHeader}>
              <MaterialCommunityIcons
                name="pencil-outline"
                size={18}
                color="#000"
              />
              <Text style={styles.manualTitle}>Manual Entry</Text>
            </View>

            <Input
              label="Recipient"
              placeholder="Enter Email or Phone Number"
              value={recipient}
              setValue={setRecipient}
            />

            <Input
              label="Amount"
              placeholder="Enter Amount"
              value={amount}
              setValue={setAmount}
              keyboardType="numeric"
            />

            <Input
              label="Bank Name"
              placeholder="Enter Bank Name"
              value={bankName}
              setValue={setBankName}
            />

            <Input
              label="Account Number"
              placeholder="Enter Account Number"
              value={accountNumber}
              setValue={setAccountNumber}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("SendMoneySecond")}
          >
            <Text style={styles.buttonText}>Continue with FUSE Analysis</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FuseSendVoiceScreen;

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  setValue: (text: string) => void;
  keyboardType?: any;
}

const Input = ({
  label,
  placeholder,
  value,
  setValue,
  keyboardType,
}: InputProps) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputBox}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#777"
        value={value}
        onChangeText={setValue}
        keyboardType={keyboardType}
      />
    </View>
  </>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: responsiveHeight(5),
    marginHorizontal: responsiveWidth(5),
  },

  headerTitle: {
    fontSize: responsiveFontSize(2),
    fontFamily: Fonts.bold,
  },

  bgCard: {
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(3),
    padding: moderateScale(15),
    borderRadius: moderateScale(14),
    backgroundColor: "#1F2A56",
  },

  bgHeader: { flexDirection: "row", alignItems: "center" },

  robot: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    marginRight: responsiveWidth(2),
    resizeMode: "contain",
  },

  bgTitle: {
    color: "#fff",
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.semiBold,
  },

  suggestionCard: {
    backgroundColor: "#fff",
    marginTop: responsiveHeight(1.5),
    borderRadius: moderateScale(10),
    padding: moderateScale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  userRow: { flexDirection: "row", alignItems: "center" },

  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1F2A56",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  userName: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.bold,
  },

  subText: { fontSize: responsiveFontSize(1.2), color: "#777" },

  price: {
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.bold,
  },

  voiceSection: {
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(3),
  },

  voiceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  voiceHeaderText: {
    marginLeft: 8,
    fontFamily: Fonts.semiBold,
    fontSize: responsiveFontSize(1.5),
  },

  voiceBox: {
    backgroundColor: "#e5e7eb",
    borderRadius: moderateScale(12),
    paddingVertical: responsiveHeight(3),
    alignItems: "center",
  },

  voiceCircle: {
    width: responsiveWidth(22),
    height: responsiveWidth(22),
    borderRadius: responsiveWidth(11),
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  voiceText: {
    fontSize: responsiveFontSize(1.4),
    fontFamily: Fonts.semiBold,
  },

  manualSection: {
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(3),
  },

  manualHeader: { flexDirection: "row", alignItems: "center" },

  manualTitle: {
    marginLeft: 8,
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.semiBold,
  },

  label: {
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(1.4),
    fontFamily: Fonts.semiBold,
    marginBottom: responsiveHeight(0.5),
  },

  inputBox: {
    backgroundColor: "#1e1e1e0f",
    borderRadius: moderateScale(8),
    height: responsiveHeight(6.3),
    paddingHorizontal: 10,
    justifyContent: "center",
  },

  input: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: Fonts.medium,
  },

  button: {
    marginHorizontal: responsiveWidth(5),
    marginVertical: responsiveHeight(4),
    height: responsiveHeight(6.8),
    backgroundColor: "#1F2A50",
    borderRadius: moderateScale(12),
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: responsiveFontSize(1.8),
    fontFamily: Fonts.bold,
  },
});
