import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    // Confrim user registration
    confirmRegistration: builder.mutation<any, { otp: string; id: string }>({
      query: (data) => ({
        url: "/auth/signup/confirm",
        method: "POST",
        data,
      }),
    }),

    // resend OTP
    resendOtp: builder.mutation<any, { id: string }>({
      query: (data) => ({
        url: "/auth/otp/resend",
        method: "POST",
        data,
      }),
    }),

    // Verify OTP for Reset Password
    verifyOtpResetPassword: builder.mutation<any, { otp: string; id: string }>({
      query: (data) => ({
        url: "/auth/verify-reset-password",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useConfirmRegistrationMutation,
  useResendOtpMutation,
  useVerifyOtpResetPasswordMutation,
} = authApi;
