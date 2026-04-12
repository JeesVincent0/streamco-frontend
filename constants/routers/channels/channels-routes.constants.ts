export const CHANNEL_ROUTES = {
  ROOT: (id: string) => `/channel/${id}`,
  BASE: "base",
  DASHBOARD: {
    ROOT: (id: string) => `/channel/${id}/dashboard`,
  },
  LIVE_HISTORY: {
    ROOT: (id: string) => `/channel/${id}/live-history`,
  },
  SCHEDULED_LIVE: {
    ROOT: (id: string) => `/channel/${id}/scheduled-live`,
    VIEW: (id: string, live_id: string) =>
      `/channel/${id}/scheduled-live/${live_id}`,
    CREATE: (id: string) => `/channel/${id}/scheduled-live/create`,
  },
  EARNINGS: {
    ROOT: (id: string) => `/channel/${id}/earnings`,
  },
  POSTS: {
    ROOT: (id: string) => `/channel/${id}/posts`,
  },
  SETTINGS: {
    ROOT: (id: string) => `/channel/${id}/settings/profile`,
  },
};
