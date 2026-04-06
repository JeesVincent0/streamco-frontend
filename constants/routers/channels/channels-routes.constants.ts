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
