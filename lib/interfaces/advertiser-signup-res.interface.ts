export interface AdvertiserSignupResponse {
  status: string;
  message: string;
  data: {
    id: string;
    purpose: string;
    otpResendAt: number;
  };
}
