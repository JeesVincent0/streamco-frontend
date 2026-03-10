import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { axiosIntance } from "./axios";
import { logout } from "./slice/authSlice";

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: string;
      data?: unknown;
      params?: unknown;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }, api) => {
    try {
      const result = await axiosIntance({
        url,
        method,
        data,
        params,
      });

      return { data: result.data };
    } catch (axiosError: any) {
      const status = axiosError.response?.status;

      // access token expired
      if (status === 401) {
        try {
          // call refresh endpoint
          await axiosIntance.post("/auth/refresh-token");

          // retry original request
          const retryResult = await axiosIntance({
            url,
            method,
            data,
            params,
          });

          return { data: retryResult.data };
        } catch {
          api.dispatch(logout());

          return {
            error: {
              status: 401,
              data: "Session expired",
            },
          };
        }
      }

      return {
        error: {
          status,
          data: axiosError.response?.data,
        },
      };
    }
  };
