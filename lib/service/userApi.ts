import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";
import { BaseUser } from "../interfaces/base-user.interface";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    fetchBaseUser: builder.query<BaseUser, void>({
      query: (params) => ({
        url: "/user/base",
        method: "GET",
        data: null,
        params,
      }),
    }),
  }),
});

export const { useFetchBaseUserQuery } = userApi;
