import { ADMIN_ROUTES } from "@/constants/routers";
import { axiosBaseQuery } from "@/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["categories", "category"],
  endpoints: (builder) => ({
    // create new category
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_ROUTES.CATEGORIES.CREATE}`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["categories"],
    }),

    // get all categories with pagination
    getCategories: builder.query({
      query: (params) => ({
        url: `${ADMIN_ROUTES.CATEGORIES.ROOT}`,
        method: "GET",
        params,
      }),
      providesTags: ["categories"],
    }),
  }),
});

export const { useCreateCategoryMutation, useGetCategoriesQuery } = categoryApi;
