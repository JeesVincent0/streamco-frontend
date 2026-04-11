import { createApi } from "@reduxjs/toolkit/query/react"; // Use '/react' to auto-generate hooks
import { axiosBaseQuery } from "@/lib/axiosBaseQuery";
import { LIVE_ROUTES } from "@/constants/routers/channels";

export const liveApi = createApi({
  reducerPath: "liveApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["scheduledLives"],

  endpoints: (builder) => ({
    // GET SCHEDULED LIVE
    getScheduledLives: builder.query({
      query: ({ channelId, params }) => ({
        url: `${LIVE_ROUTES.LIVE.ROOT}/${LIVE_ROUTES.LIVE.SCHEDULED}/${channelId}`,
        method: "GET",
        params,
      }),
      providesTags: ["scheduledLives"],
    }),

    // SCHEDULE LIVE
    scheduleLive: builder.mutation({
      query: (data) => ({
        url: `${LIVE_ROUTES.LIVE.ROOT}/${LIVE_ROUTES.LIVE.SCHEDULE}`,
        method: "POST",
        data,
      }),
    }),

    // CANCEL SCHEDULED LIVE
    cancelScheduledLive: builder.mutation({
      query: ({ liveId }) => ({
        url: `${LIVE_ROUTES.LIVE.ROOT}/${LIVE_ROUTES.LIVE.SCHEDULED}/${liveId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetScheduledLivesQuery,
  useScheduleLiveMutation,
  useCancelScheduledLiveMutation,
} = liveApi;
