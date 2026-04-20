import { ADVERTISER_ROUTES } from "@/constants/routers";
import { axiosBaseQuery } from "@/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const scheduledLiveApi = createApi({
  reducerPath: "ScheduledLiveApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getScheduledLvies: builder.query({
      query: ({ params }) => ({
        url: ADVERTISER_ROUTES.HOME.SCHEDULED_LIVE.ROOT,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetScheduledLviesQuery } = scheduledLiveApi;
