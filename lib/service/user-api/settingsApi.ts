import { axiosBaseQuery } from "@/lib/axiosBaseQuery";
import { UserProfileInterface } from "@/lib/interfaces";
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
  }),
});

export const { useGetUserProfileQuery } = settingApi;
