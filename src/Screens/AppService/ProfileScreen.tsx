import React, { useCallback, useMemo, useState } from "react";
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
  ActivityIndicator,
} from "react-native";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { moderateScale } from "react-native-size-matters";
import { Feather } from "@expo/vector-icons";
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { logoutAccount } from "../../services/authApi";
import { clearManualKycDraft } from "../../services/manualKycDraft";
import {
  clearSession,
  getAccessTokenAsync,
  getSessionUser,
} from "../../services/session";
import { fetchCurrentUserStatus } from "../../services/userApi";

interface ProfileIdentity {
  firstName: string;
  lastName: string;
  email: string;
}

import { useLanguage } from "../../context/LanguageContext";

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { t } = useLanguage();

  const sessionUser = getSessionUser();
  const [identity, setIdentity] = useState<ProfileIdentity>({
    firstName: sessionUser?.firstName ?? t("common.welcome"),
    lastName: sessionUser?.lastName ?? "User",
    email: sessionUser?.email ?? "",
  });
  const [isLoadingIdentity, setIsLoadingIdentity] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const resetToLogin = useCallback(() => {
    const rootNavigator = navigation.getParent()?.getParent()?.getParent() || navigation.getParent()?.getParent();

    if (rootNavigator) {
      rootNavigator.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        }),
      );
      return;
    }

    navigation.navigate("Login");
  }, [navigation]);

  const loadProfileIdentity = useCallback(async () => {
    try {
      setErrorMessage("");
      setIsLoadingIdentity(true);

      const accessToken = await getAccessTokenAsync();

      if (!accessToken) {
        await clearSession();
        resetToLogin();
        return;
      }

      const me = await fetchCurrentUserStatus(accessToken);

      setIdentity({
        firstName: me.firstName?.trim() || t("common.welcome"),
        lastName: me.lastName?.trim() || "User",
        email: me.email,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to load profile details.";

      const normalized = message.toLowerCase();
      if (normalized.includes("token") || normalized.includes("auth")) {
        await Promise.all([clearSession(), clearManualKycDraft()]);
        resetToLogin();
        return;
      }

      setErrorMessage(message);
    } finally {
      setIsLoadingIdentity(false);
    }
  }, [resetToLogin, t]);

  useFocusEffect(
    useCallback(() => {
      void loadProfileIdentity();
    }, [loadProfileIdentity]),
  );

  const handleLogout = useCallback(() => {
    void (async () => {
      if (isLoggingOut) return;

      try {
        setErrorMessage("");
        setIsLoggingOut(true);

        const accessToken = await getAccessTokenAsync();
        await logoutAccount(accessToken ?? undefined);
      } catch {
        // Logout should still proceed locally even if network logout fails.
      } finally {
        await Promise.all([clearSession(), clearManualKycDraft()]);
        setIsLoggingOut(false);
        resetToLogin();
      }
    })();
  }, [isLoggingOut, resetToLogin]);

  const fullName = useMemo(
    () => `${identity.firstName} ${identity.lastName}`.trim(),
    [identity.firstName, identity.lastName],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F5F7" }}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: responsiveHeight(4) }}
      >
        <View style={{ height: responsiveHeight(35) }}>
          <ImageBackground
            source={require("../../../assets/mainbg.png")}
            style={{ flex: 1 }}
            resizeMode="cover"
          >
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>{t("profile.title")}</Text>

              <Image
                source={require("../../../assets/profileimg.png")}
                style={styles.profileImage}
              />

              {isLoadingIdentity ? (
                <View style={styles.loadingWrap}>
                  <ActivityIndicator color="#fff" />
                  <Text style={styles.loadingText}>Syncing profile...</Text>
                </View>
              ) : (
                <>
                  <Text style={styles.name}>{fullName}</Text>
                  <Text style={styles.email}>{identity.email}</Text>
                </>
              )}

              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}
            </View>
          </ImageBackground>
        </View>

        <View style={styles.inviteCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.inviteTitle}>{t("common.inviteFriends")}</Text>
            <Text style={styles.inviteSub}>
              {t("common.inviteSub")}
            </Text>
          </View>

          <Image
            source={require("../../../assets/invite.png")}
            style={styles.inviteImage}
          />
        </View>

        <View style={styles.menuContainer}>
          {menuItem(t("common.profile"), require("../../../assets/user.png"), () =>
            navigation.navigate("ProfileSettings"),
          )}

          {menuItem(
            t("common.security"),
            require("../../../assets/security.png"),
            () => navigation.navigate("SecuritySettings"),
          )}

          {menuItem(
            t("common.settings"),
            require("../../../assets/general.png"),
            () => navigation.navigate("GeneralSettings"),
          )}

          {menuItem("Ask MAYA", require("../../../assets/maya.png"), () =>
            navigation.navigate("MayaAI"),
          )}

          <TouchableOpacity
            style={styles.logoutRow}
            onPress={handleLogout}
            disabled={isLoggingOut}
          >
            <Text style={styles.logoutText}>
              {isLoggingOut ? "Logging out..." : t("common.logout")}
            </Text>

            <Image
              source={require("../../../assets/logout.png")}
              style={styles.logoutImage}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const menuItem = (title: string, icon: any, onPress: () => void) => {
  return (
    <TouchableOpacity style={styles.menuRow} onPress={onPress}>
      <View style={styles.leftSection}>
        <View style={styles.iconCircle}>
          <Image source={icon} style={styles.menuIcon} />
        </View>

        <Text style={styles.menuText}>{title}</Text>
      </View>

      <Feather name="chevron-right" size={moderateScale(18)} color="#000000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerContent: {
    flex: 1,
    alignItems: "center",
    paddingTop: responsiveHeight(2),
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(2.2),
    fontFamily: "Manrope-SemiBold",
    marginBottom: responsiveHeight(2),
  },

  profileImage: {
    width: responsiveWidth(25),
    height: responsiveWidth(25),
    borderRadius: responsiveWidth(20),
    marginBottom: responsiveHeight(1.5),
  },

  loadingWrap: {
    alignItems: "center",
    marginBottom: responsiveHeight(0.8),
  },

  loadingText: {
    marginTop: responsiveHeight(0.7),
    color: "#E1E6EF",
    fontSize: responsiveFontSize(1.4),
    fontFamily: "Manrope-SemiBold",
  },

  name: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(2.4),
    fontFamily: "Manrope-Bold",
  },

  email: {
    color: "#D6D6D6",
    fontSize: responsiveFontSize(1.7),
    marginTop: responsiveHeight(0.5),
  },

  errorText: {
    marginTop: responsiveHeight(0.7),
    color: "#FFD3D3",
    fontSize: responsiveFontSize(1.2),
    fontFamily: "Manrope-SemiBold",
    textAlign: "center",
    paddingHorizontal: responsiveWidth(10),
  },

  inviteCard: {
    flexDirection: "row",
    backgroundColor: "#253B6E",
    marginHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(2),
    borderRadius: moderateScale(5),
    padding: responsiveWidth(4),
    alignItems: "center",
  },

  inviteTitle: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(2),
    fontFamily: "Manrope-SemiBold",
    marginBottom: responsiveHeight(0.5),
  },

  inviteSub: {
    color: "#DADADA",
    fontSize: responsiveFontSize(1.5),
  },

  inviteImage: {
    width: responsiveWidth(18),
    height: responsiveWidth(18),
    resizeMode: "contain",
    marginLeft: responsiveWidth(3),
  },

  menuContainer: {
    marginTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
    gap: responsiveHeight(1.5),
    marginBottom: responsiveHeight(10),
  },

  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#98939309",
    paddingVertical: responsiveWidth(3.5),
    paddingHorizontal: responsiveWidth(4),
    borderRadius: moderateScale(8),
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconCircle: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: responsiveWidth(3),
  },

  menuIcon: {
    width: responsiveWidth(9),
    height: responsiveWidth(9),
    resizeMode: "contain",
  },

  menuText: {
    fontSize: responsiveFontSize(1.9),
    fontFamily: "Manrope-SemiBold",
    color: "#1F2A50",
  },

  logoutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#98939309",
    paddingVertical: responsiveWidth(4),
    paddingHorizontal: responsiveWidth(4),
    borderRadius: moderateScale(8),
  },

  logoutText: {
    color: "#FB002E",
    fontSize: responsiveFontSize(2),
    fontFamily: "Manrope-SemiBold",
  },

  logoutImage: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    resizeMode: "contain",
  },
});
