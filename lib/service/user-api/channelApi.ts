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

    // ─── GET CHANNELS QUERY ───
    getChannels: builder.query({
      query: (params: { page: number; limit: number; search?: string }) => ({
        url: `/channels`,
        method: "GET",
        params,
      }),
      providesTags: ["channels"],
    }),
  }),
});

export const { useCreateChannelMutation, useGetChannelsQuery } = channelApi;
