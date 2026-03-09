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
      sortBy: "dispalyName" | "email" = "dispalyName",
      order: "asc" | "desc" = "asc",
      role: "ADVERTISER" | "PUBLISHER" | "ADMIN" | "" = "",
      status: "SUSPENDED" | "ACTIVE" | "DELETED" | "" = "",
      search: string = "",
      isVerified?: boolean,
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
  },
  EARNINGS: {
    ROOT: `${ROOT}/earnings`,
  },
};
