import { ADMIN_ROUTES } from "@/constants/routers";
import { axiosBaseQuery } from "@/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_ROUTES.CATEGORIES.CREATE}`,
        method: "POST",
        data,
      }),
    }),

    getCategories: builder.query({
      query: (params) => ({
        url: `${ADMIN_ROUTES.CATEGORIES.ROOT}`,
        method: "GET",
        params,
      }),
    }),

    updateCategoryStatus: builder.mutation({
      query: ({
        id,
        status,
      }: {
        id: string;
        status: string;
        queryArgs?: {
          page: number;
          limit: number;
          sortBy: "name" | "slug" | "liveCount" | "scheduledLiveCount" | "createdAt";
          order: "asc" | "desc";
          status: string;
          search: string;
        };
      }) => ({
        url: `${ADMIN_ROUTES.CATEGORIES.UPDATE_STATUS(id)}`,
        method: "POST",
        data: { status },
      }),

      async onQueryStarted(
        { id, status, queryArgs },
        { dispatch, queryFulfilled },
      ) {
        try {
          await queryFulfilled;

          dispatch(
            categoryApi.util.updateQueryData(
              "getCategories",
              queryArgs,
              (draft) => {
                const categoriesList = draft?.data?.categories;
                if (categoriesList) {
                  const category = categoriesList.find(
                    (c: { id: string }) => c.id === id,
                  );
                  if (category) {
                    category.status = status;
                  }
                }
              },
            ),
          );
        } catch {}
      },
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryStatusMutation,
} = categoryApi;
