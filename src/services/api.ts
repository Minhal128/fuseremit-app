import { Platform } from "react-native";

const LOCAL_ANDROID = "http://10.0.2.2:4000/api/v1";
const LOCAL_OTHER = "http://localhost:4000/api/v1";

const envBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();

export const API_BASE_URL =
  envBaseUrl && envBaseUrl.length > 0
    ? envBaseUrl
    : Platform.OS === "android"
      ? LOCAL_ANDROID
      : LOCAL_OTHER;

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  error: {
    code?: string;
    message?: string;
    category?: string;
  } | null;
  meta?: {
    requestId?: string;
    timestamp?: string;
  };
}

const buildHeaders = (accessToken?: string): Record<string, string> => ({
  "Content-Type": "application/json",
  ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
});

const parseJsonResponse = async <TResponse>(
  response: Response,
  path: string,
): Promise<ApiEnvelope<TResponse>> => {
  const json = (await response.json()) as ApiEnvelope<TResponse>;

  if (__DEV__) {
    console.log(
      `[API] ${response.status} ${path} requestId=${json.meta?.requestId ?? "n/a"}`,
    );
  }

  if (!response.ok || !json.success) {
    const message = json.error?.message || "Request failed";
    throw new Error(message);
  }

  return json;
};

export const postJson = async <
  TResponse,
  TPayload extends object = Record<string, unknown>,
>(
  path: string,
  payload: TPayload,
  accessToken?: string,
): Promise<ApiEnvelope<TResponse>> => {
  if (__DEV__) {
    console.log(`[API] POST ${API_BASE_URL}${path}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: buildHeaders(accessToken),
    body: JSON.stringify(payload),
  });

  return parseJsonResponse<TResponse>(response, path);
};

export const getJson = async <TResponse>(
  path: string,
  accessToken?: string,
): Promise<ApiEnvelope<TResponse>> => {
  if (__DEV__) {
    console.log(`[API] GET ${API_BASE_URL}${path}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers: buildHeaders(accessToken),
  });

  return parseJsonResponse<TResponse>(response, path);
};

export const putJson = async <
  TResponse,
  TPayload extends object = Record<string, unknown>,
>(
  path: string,
  payload: TPayload,
  accessToken?: string,
): Promise<ApiEnvelope<TResponse>> => {
  if (__DEV__) {
    console.log(`[API] PUT ${API_BASE_URL}${path}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "PUT",
    headers: buildHeaders(accessToken),
    body: JSON.stringify(payload),
  });

  return parseJsonResponse<TResponse>(response, path);
};

export const patchJson = async <
  TResponse,
  TPayload extends object = Record<string, unknown>,
>(
  path: string,
  payload: TPayload,
  accessToken?: string,
): Promise<ApiEnvelope<TResponse>> => {
  if (__DEV__) {
    console.log(`[API] PATCH ${API_BASE_URL}${path}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "PATCH",
    headers: buildHeaders(accessToken),
    body: JSON.stringify(payload),
  });

  return parseJsonResponse<TResponse>(response, path);
};
