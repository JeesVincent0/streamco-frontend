import { ADVERTISER_ROUTES } from "@/constants/routers";
import { axiosBaseQuery } from "@/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const auctionApi = createApi({
  reducerPath: "AuctionApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getAuctionOverview: builder.query({
      query: (id) => ({
        url: ADVERTISER_ROUTES.HOME.SCHEDULED_LIVE.ACTION_ANALYTICS(id),
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAuctionOverviewQuery } = auctionApi;
