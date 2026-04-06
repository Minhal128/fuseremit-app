import { postJson } from "./api";

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth?: string;
  gender?: "Male" | "Female" | "Other";
}

export interface RegisterResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountTier: "Classic" | "Premium";
  persistenceVerified: boolean;
}

export interface LoginOtpRequest {
  email: string;
  password: string;
}

export interface LoginOtpResponse {
  challengeId: string;
  expiresAt: string;
}

export interface VerifyOtpRequest {
  challengeId: string;
  otp: string;
}

export interface VerifyOtpResponse {
  accessToken: string;
  user: {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    hasPin: boolean;
  };
  requiresPinSetup: boolean;
}

export interface CreatePinResponse {
  hasPin: boolean;
}

export interface LogoutResponse {
  loggedOut: boolean;
}

export const requestEmailLoginOtp = async (payload: LoginOtpRequest) => {
  const res = await postJson<LoginOtpResponse, LoginOtpRequest>("/auth/login", payload);
  return res.data;
};

export const registerAccount = async (payload: RegisterRequest) => {
  const res = await postJson<RegisterResponse, RegisterRequest>(
    "/auth/register",
    payload,
  );

  return res.data;
};

export const verifyEmailLoginOtp = async (payload: VerifyOtpRequest) => {
  const res = await postJson<VerifyOtpResponse, VerifyOtpRequest>(
    "/auth/otp/verify",
    payload,
  );
  return res.data;
};

export const resendEmailLoginOtp = async (challengeId: string) => {
  const res = await postJson<
    { challengeId: string; expiresAt: string },
    { challengeId: string }
  >(
    "/auth/otp/resend",
    { challengeId },
  );

  return res.data;
};

export const createPin = async (payload: { pin: string }, accessToken: string) => {
  const res = await postJson<CreatePinResponse, { pin: string }>(
    "/auth/pin/create",
    payload,
    accessToken,
  );

  return res.data;
};

export const logoutAccount = async (accessToken?: string) => {
  const res = await postJson<LogoutResponse, Record<string, never>>(
    "/auth/logout",
    {},
    accessToken,
  );

  return res.data;
};
