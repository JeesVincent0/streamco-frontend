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
    // Extract signal from the api object
    const { signal } = api;

    try {
      const result = await axiosIntance({
        url,
        method,
        data,
        params,
        signal, // ─── Pass signal here ───
      });

      return { data: result.data };
    } catch (error: unknown) {
      const axiosError = error as {
        response: { status: number; data: unknown };
      };
      const status = axiosError.response?.status;

      if (status === 401) {
        try {
          await axiosIntance.post("/auth/refresh-token");

          const retryResult = await axiosIntance({
            url,
            method,
            data,
            params,
            signal, // ─── Pass signal here too ───
          });

          return { data: retryResult.data };
        } catch {
          api.dispatch(logout());
          return {
            error: { status: 401, data: "Session expired" },
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
