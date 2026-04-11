import { postJson, ApiEnvelope } from "./api";
import { getAccessToken } from "./session";

export interface CreatePaymentIntentRequest {
  amount: number;
  currency?: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export const createPaymentIntent = async (
  payload: CreatePaymentIntentRequest,
): Promise<PaymentIntentResponse> => {
  const token = await getAccessToken();
  if (!token) throw new Error("No access token found");

  const response = await postJson<PaymentIntentResponse>(
    "/payments/create-intent",
    payload,
    token,
  );
  return response.data;
};
