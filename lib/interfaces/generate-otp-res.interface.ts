export interface GenerateOtpRespose {
  status: string;
  message: string;
  data: { id: string; purpose: string; otpResendAt: string };
}
