import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";
import { ROLE } from "@/constants/role.enum";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    fetchBaseUser: builder.query<
      {
        user: {
          id: string;
          displayName: string;
          email: string;
          avatarUrl: string;
          role: ROLE;
        };
      },
      void
    >({
      query: () => ({
        url: "/baseuser",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchBaseUserQuery } = userApi;
