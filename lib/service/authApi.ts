import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";
import {
  IResendOtpRequest,
  IResendOtpResponse,
  IConfirmRegistrationRequest,
  IConfirmRegistrationResponse,
  IVerifyOtpResetPasswordRequest,
  IVerifyOtpResetPasswordResponse,
  Signin,
  AdvertiserSignup,
  UserSingupRequest,
  UserSignupResponse,
  GenerateOtpRespose,
} from "../interfaces/";
import { BaseUser } from "../interfaces/base-user.interface";
import { AdvertiserSignupResponse } from "../interfaces/advertiser-signup-res.interface";
import { GenerateOtpRequest } from "../interfaces/generate-otp.interface";

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

    // admin signin
    adminSignin: builder.mutation<BaseUser, Signin>({
      query: (data) => ({
        url: "/auth/admin/signin",
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

    // reset password
    resetPassword: builder.mutation<
      { status: string; message: string },
      { password: string; confrimPassword: string }
    >({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        data,
      }),
    }),

    // generate otp
    generateOtpApi: builder.mutation<GenerateOtpRespose, GenerateOtpRequest>({
      query: (data) => ({
        url: "/auth/otp/generate",
        method: "POST",
        data,
      }),
    }),

    // advertiser signup
    signupAdvertiser: builder.mutation<
      AdvertiserSignupResponse,
      AdvertiserSignup
    >({
      query: (data) => ({
        url: "/auth/signup/advertiser",
        method: "POST",
        data,
      }),
    }),

    // user signup
    signupUser: builder.mutation<UserSignupResponse, UserSingupRequest>({
      query: (data) => ({
        url: "/auth/signup/user",
        method: "POST",
        data,
      }),
    }),

    // signin
    userSigninApi: builder.mutation<BaseUser, Signin>({
      query: (data) => ({
        url: "/auth/signin",
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
  useAdminSigninMutation,
  useVerifyOtpResetPasswordMutation,
  useLogoutUserMutation,
  useSignupAdvertiserMutation,
  useSignupUserMutation,
  useGenerateOtpApiMutation,
  useUserSigninApiMutation,
  useResetPasswordMutation,
} = authApi;
