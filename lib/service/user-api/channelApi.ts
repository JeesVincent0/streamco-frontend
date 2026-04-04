import { ADMIN_ROUTES } from "@/constants/routers";
import { CHANNEL_ROUTES } from "@/constants/routers/channels";
import { axiosBaseQuery } from "@/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const channelApi = createApi({
  reducerPath: "channelApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["channels", "channel"],

  endpoints: (builder) => ({
    getChannelDetails: builder.query({
      query: (id: string) => ({
        url: CHANNEL_ROUTES.ROOT(id),
        method: "GET",
      }),
    }),
    // ─── Create Channel ───
    createChannel: builder.mutation({
      query: (data) => ({
        url: `/channels/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["channels"],
    }),

    updateChannelStatus: builder.mutation({
      query: (data) => ({
        url: ADMIN_ROUTES.CHANNELS.UPDATE_STATUS(data.channelId),
        method: "PATCH",
        data: { status: data.status },
      }),

      invalidatesTags: ["channels"],

      async onQueryStarted(
        { channelId, status, queryArgs },
        { dispatch, queryFulfilled },
      ) {
        const patchResult = dispatch(
          channelApi.util.updateQueryData(
            "getAllChannels",
            queryArgs,
            (draft) => {
              const channel = draft.data.channels.find(
                (c: { channelId: string }) => c.channelId === channelId,
              );
              if (channel) {
                channel.status = status;
              }
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // ─── Get Channels ───
    getChannels: builder.query({
      query: (params) => ({
        url: `/channels`,
        method: "GET",
        params,
      }),
      providesTags: ["channels"],
    }),

    // ─── Get Single Channel ───
    getChannelById: builder.query({
      query: (channelId) => ({
        url: `/channels/${channelId}`,
        method: "GET",
      }),
      providesTags: ["channel"],
    }),

    getChannelByIdAdmin: builder.query({
      query: (channelId) => ({
        url: ADMIN_ROUTES.CHANNELS.BYID(channelId),
        method: "GET",
      }),
    }),

    // ─── Get All Channels ───
    getAllChannels: builder.query({
      query: (params) => ({
        url: ADMIN_ROUTES.CHANNELS.ROOT,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useGetAllChannelsQuery,
  useGetChannelByIdQuery,
  useCreateChannelMutation,
  useGetChannelDetailsQuery,
  useGetChannelByIdAdminQuery,
  useUpdateChannelStatusMutation,
} = channelApi;
