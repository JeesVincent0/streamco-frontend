export interface IVerifyOtpResetPasswordResponse {
  status: string;
  message: string;
}
export interface IVerifyOtpResetPasswordRequest {
  otp: string;
  id: string;
}
