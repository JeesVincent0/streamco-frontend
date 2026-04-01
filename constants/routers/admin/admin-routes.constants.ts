const ROOT = `/admin`;

export const ADMIN_ROUTES = {
  HOME: {
    ROOT: `${ROOT}`,
  },
  SIGNIN: {
    ROOT: `${ROOT}/signin`,
  },
  DASHBOARD: {
    ROOT: `${ROOT}/dashboard`,
  },
  USERS: {
    ROOT: `${ROOT}/users`,
    DETAILS: (userId: string) => `${ROOT}/users/${userId}`,
    QUERY: (
      page = 1,
      limit = 10,
      sortBy:
        | "displayName"
        | "email"
        | "createdAt"
        | string
        | undefined = "createdAt",
      order: "asc" | "desc" | string | undefined = "desc",
      role: "ADVERTISER" | "PUBLISHER" | "ADMIN" | string | undefined = "",
      status: "SUSPENDED" | "ACTIVE" | "DELETED" | string | undefined = "",
      search: string | undefined = "",
      isVerified: boolean | string | undefined | null = "all",
    ) =>
      `${ROOT}/users?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}&role=${role}&isVerified=${isVerified}&status=${status}&search=${search}`,
  },
  ADVERTISERS: {
    ROOT: `${ROOT}/advertisers`,
  },
  CHANNELS: {
    ROOT: `${ROOT}/channels`,
  },
  CATEGORIES: {
    ROOT: `${ROOT}/categories`,
    CREATE: `${ROOT}/categories/create`,
    UPDATE_STATUS: (id: string) => `${ROOT}/categories/${id}/status`,
  },
  EARNINGS: {
    ROOT: `${ROOT}/earnings`,
  },
  TEST: {
    ROOT: `${ROOT}/test`,
  },
};
