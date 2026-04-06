import { Platform } from "react-native";

const LOCAL_ANDROID = "http://10.0.2.2:4000/api/v1";
const LOCAL_OTHER = "http://localhost:4000/api/v1";

export const API_BASE_URL =
  Platform.OS === "android" ? LOCAL_ANDROID : LOCAL_OTHER;

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

export const postJson = async <
  TResponse,
  TPayload extends object = Record<string, unknown>,
>(
  path: string,
  payload: TPayload,
  accessToken?: string,
): Promise<ApiEnvelope<TResponse>> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  const json = (await response.json()) as ApiEnvelope<TResponse>;

  if (!response.ok || !json.success) {
    const message = json.error?.message || "Request failed";
    throw new Error(message);
  }

  return json;
};
