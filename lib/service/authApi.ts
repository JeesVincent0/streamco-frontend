import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";
import {
  IResendOtpRequest,
  IResendOtpResponse,
  IConfirmRegistrationRequest,
  IConfirmRegistrationResponse,
  IVerifyOtpResetPasswordRequest,
  IVerifyOtpResetPasswordResponse,
} from "../interfaces/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    // Confrim user registration
    confirmRegistration: builder.mutation<
      IConfirmRegistrationResponse,
      IConfirmRegistrationRequest
    >({
      query: (data) => ({
        url: "/auth/signup/confirm",
        method: "POST",
        data,
      }),
    }),

    // resend OTP
    resendOtp: builder.mutation<IResendOtpResponse, IResendOtpRequest>({
      query: (data) => ({
        url: "/auth/otp/resend",
        method: "POST",
        data,
      }),
    }),

    // Verify OTP for Reset Password
    verifyOtpResetPassword: builder.mutation<
      IVerifyOtpResetPasswordResponse,
      IVerifyOtpResetPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/verify-reset-password",
        method: "POST",
        data,
      }),
    }),

    // logout
    logoutUser: builder.mutation<{ message: string; status: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useConfirmRegistrationMutation,
  useResendOtpMutation,
  useVerifyOtpResetPasswordMutation,
  useLogoutUserMutation,
} = authApi;
