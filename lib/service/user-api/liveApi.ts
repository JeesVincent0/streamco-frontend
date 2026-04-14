import { createApi } from "@reduxjs/toolkit/query/react"; // Use '/react' to auto-generate hooks
import { axiosBaseQuery } from "@/lib/axiosBaseQuery";
import { CHANNEL_ROUTES, LIVE_ROUTES } from "@/constants/routers/channels";
import { ScheduleLiveFormValues } from "@/features/channel/validators";

export const liveApi = createApi({
  reducerPath: "liveApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["scheduledLives"],

  endpoints: (builder) => ({
    // GET MONTH LIVES FOR CALENDER
    getMonthLives: builder.query({
      query: ({
        channelId,
        year,
        month,
      }: {
        channelId: string;
        year: number;
        month: number;
      }) => ({
        url: `${LIVE_ROUTES.LIVE.ROOT}/${channelId}/month`,
        method: "GET",
        params: { year, month },
      }),
    }),

    // GET LIST OF DAY LIVES FOR CALENDAE
    getDayLives: builder.query({
      query: ({ channelId, date }) => ({
        url: `${LIVE_ROUTES.LIVE.ROOT}/${channelId}/day`,
        method: "GET",
        params: { date },
      }),
    }),

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
      query: (data: { data: ScheduleLiveFormValues; channelId: string }) => ({
        url: `${LIVE_ROUTES.LIVE.ROOT}/${data.channelId}/${LIVE_ROUTES.LIVE.SCHEDULE}`,
        method: "POST",
        data: data.data,
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
  useGetDayLivesQuery,
  useGetMonthLivesQuery,
  useScheduleLiveMutation,
  useGetScheduledLivesQuery,
  useCancelScheduledLiveMutation,
} = liveApi;
