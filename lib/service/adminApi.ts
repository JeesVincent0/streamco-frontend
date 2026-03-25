import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({
        url: "/admin/users",
        method: "GET",
        params,
      }),
    }),

    updateUserStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/admin/users/${userId}/status`,
        method: "PATCH",
        data: { status },
      }),
      async onQueryStarted(
        { userId, status, queryArgs },
        { dispatch, queryFulfilled },
      ) {
        try {
          await queryFulfilled;
          dispatch(
            adminApi.util.updateQueryData("getUsers", queryArgs, (draft) => {
              const usersList = draft?.data?.users;
              if (usersList) {
                const user = usersList.find((u: any) => u.id === userId);
                if (user) {
                  user.status = status;
                }
              }
            }),
          );

          dispatch(
            adminApi.util.updateQueryData("getUserById", userId, (draft) => {
              if (draft) draft.status = status;
            }),
          );
        } catch {}
      },
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `/user/profile/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
  useGetUserByIdQuery,
} = adminApi;
