export interface UserSignupResponse {
  status: string;
  message: string;
  data?: { id: string; email: string; otpResendAt: string };
}
