import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export interface SessionUser {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  hasPin: boolean;
}

interface SessionState {
  accessToken: string | null;
  user: SessionUser | null;
}

const state: SessionState = {
  accessToken: null,
  user: null,
};

const ACCESS_TOKEN_KEY = "@fuseremit/accessToken";
const SESSION_USER_KEY = "@fuseremit/sessionUser";
const BIOMETRIC_TOKEN_KEY = "@fuseremit/biometricToken";

const setSessionCache = (params: { accessToken: string; user: SessionUser }) => {
  state.accessToken = params.accessToken;
  state.user = params.user;
};

export const setSession = async (params: {
  accessToken: string;
  user: SessionUser;
}) => {
  setSessionCache(params);

  await AsyncStorage.multiSet([
    [ACCESS_TOKEN_KEY, params.accessToken],
    [SESSION_USER_KEY, JSON.stringify(params.user)],
  ]);
};

export const clearSession = async () => {
  state.accessToken = null;
  state.user = null;

  await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, SESSION_USER_KEY]);
};

export const getAccessToken = (): string | null => state.accessToken;

export const getAccessTokenAsync = async (): Promise<string | null> => {
  if (state.accessToken) return state.accessToken;

  const storedToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);

  if (!storedToken) {
    return null;
  }

  state.accessToken = storedToken;
  return storedToken;
};

export const getSessionUser = (): SessionUser | null => state.user;

export const hydrateSession = async (): Promise<void> => {
  const [storedToken, storedUser] = await AsyncStorage.multiGet([
    ACCESS_TOKEN_KEY,
    SESSION_USER_KEY,
  ]);

  const accessToken = storedToken[1];
  const userJson = storedUser[1];

  if (!accessToken || !userJson) {
    return;
  }

  try {
    const parsedUser = JSON.parse(userJson) as SessionUser;
    setSessionCache({
      accessToken,
      user: parsedUser,
    });
  } catch {
    await AsyncStorage.removeItem(SESSION_USER_KEY);
  }
};

export const markPinCreated = () => {
  if (!state.user) return;

  state.user = {
    ...state.user,
    hasPin: true,
  };

  void AsyncStorage.setItem(SESSION_USER_KEY, JSON.stringify(state.user));
};

export const setBiometricToken = async (token: string) => {
  await SecureStore.setItemAsync(BIOMETRIC_TOKEN_KEY, token);
};

export const getBiometricToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(BIOMETRIC_TOKEN_KEY);
};

export const hasBiometricEnabled = async (): Promise<boolean> => {
  const token = await getBiometricToken();
  return !!token;
};
