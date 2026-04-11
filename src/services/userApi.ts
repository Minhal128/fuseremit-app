import { getJson, postJson, putJson } from "./api";

export type AccountTier = "Classic" | "Premium";

export interface CurrentUserStatus {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: "Male" | "Female" | "Other";
  phoneNumber?: string;
  countryCode?: string;
  hasPin: boolean;
  hasTransactionPin: boolean;
  accountTier: AccountTier;
  kycStatus: "pending" | "in_progress" | "verified" | "rejected";
  balance: number;
  currency: string;
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: "Male" | "Female" | "Other";
  phoneNumber?: string;
  countryCode?: string;
}

export interface UpdateProfileResponse {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  dateOfBirth?: string;
  gender?: "Male" | "Female" | "Other";
  phoneNumber?: string;
  countryCode?: string;
  updatedAt?: string;
}

export type KycStatus = CurrentUserStatus["kycStatus"];

export const fetchCurrentUserStatus = async (accessToken: string) => {
  const res = await getJson<CurrentUserStatus>("/users/me", accessToken);
  return res.data;
};

export const updateCurrentUserProfile = async (
  accessToken: string,
  payload: UpdateProfilePayload,
) => {
  const res = await putJson<UpdateProfileResponse, UpdateProfilePayload>(
    "/users/me",
    payload,
    accessToken,
  );

  return res.data;
};

export const updateAccountTier = async (
  accessToken: string,
  accountTier: AccountTier,
) => {
  const res = await putJson<
    { accountTier: AccountTier },
    { accountTier: AccountTier }
  >("/users/me/tier", { accountTier }, accessToken);

  return res.data;
};

export const updateKycStatus = async (
  accessToken: string,
  kycStatus: KycStatus,
) => {
  const res = await putJson<{ kycStatus: KycStatus }, { kycStatus: KycStatus }>(
    "/users/me/kyc-status",
    { kycStatus },
    accessToken,
  );

  return res.data;
};

export interface UserSettings {
  twoFactorEnabled: boolean;
  biometricEnabled: boolean;
  preferences: {
    language: string;
    pushNotifications: boolean;
    emailNotifications: boolean;
    pushToken?: string;
  };
}

export const fetchUserSettings = async (accessToken: string) => {
  const res = await getJson<UserSettings>("/users/me/settings", accessToken);
  return res.data;
};

export const updateUserSettings = async (
  accessToken: string,
  payload: Partial<UserSettings>,
) => {
  const res = await putJson<UserSettings, Partial<UserSettings>>(
    "/users/me/settings",
    payload,
    accessToken,
  );
  return res.data;
};

export const createTransactionPin = async (
  accessToken: string,
  pin: string,
) => {
  const res = await postJson<
    { hasTransactionPin: boolean },
    { pin: string }
  >("/users/me/transaction-pin", { pin }, accessToken);

  return res.data;
};
