import { ADMIN_ROUTES } from "@/constants/routers";
import { axiosBaseQuery } from "@/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const channelApi = createApi({
  reducerPath: "channelApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["channels", "channel"],
  endpoints: (builder) => ({
    // ─── Create Channel Mutation ───
    createChannel: builder.mutation({
      query: (data) => ({
        url: `/channels/create`,
        method: "POST",
        data,
      }),

      invalidatesTags: ["channels"],
    }),

    // You can add your getChannels query here later
  }),
});

export const { useCreateChannelMutation } = channelApi;
