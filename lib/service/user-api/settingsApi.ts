import { SocialLinksFormValues } from "@/features/user/validators";
import { axiosBaseQuery } from "@/lib/axiosBaseQuery";
import { UserProfileInterface } from "@/lib/interfaces";
import { UpdateBasicUserInterface } from "@/lib/interfaces/update-basic-user.interface";
import { createApi } from "@reduxjs/toolkit/query/react";

export const settingApi = createApi({
  reducerPath: "settingApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["ProfileUser"],
  endpoints: (builder) => ({
    // Get user for profile
    getUserProfile: builder.query<UserProfileInterface, void>({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: ["ProfileUser"],
    }),

    updateUserEmail: builder.mutation<
      {
        status: string;
        message: string;
        data: {
          id: string;
          purpose: string;
          otpResendAt: number;
        };
      },
      { email: string }
    >({
      query: (data) => ({
        url: "/user/profile/update-email",
        method: "PUT",
        data,
      }),
      invalidatesTags: ["ProfileUser"],
    }),

    updateBasicProfile: builder.mutation<void, UpdateBasicUserInterface>({
      query: (data) => ({
        url: "/user/profile/update-basic",
        method: "PUT",
        data,
      }),
      invalidatesTags: ["ProfileUser"],
    }),

    updateSocialLinks: builder.mutation<void, SocialLinksFormValues>({
      query: (data) => ({
        url: "/user/profile/social-links",
        method: "PUT",
        data,
      }),
      invalidatesTags: ["ProfileUser"],
    }),

    verifyOtp: builder.mutation<
      void,
      { id: string; purpose: string; otp: number }
    >({
      query: (data) => ({
        url: "user/profile/verify-otp",
        method: "POST",
        data,
      }),
      invalidatesTags: ["ProfileUser"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserEmailMutation,
  useUpdateBasicProfileMutation,
  useVerifyOtpMutation,
  useUpdateSocialLinksMutation,
} = settingApi;
