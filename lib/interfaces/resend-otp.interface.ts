export interface IResendOtpResponse {
  status: string;
  message: string;
  data: { otpResendAt: number };
}
export interface IResendOtpRequest {
  id: string;
}
