const ROOT = `/advertiser`;
const SETTINGS_ROOT = `${ROOT}/settings`;

export const ADVERTISER_ROUTES = {
  HOME: {
    ROOT: `${ROOT}/dashboard`,
    SCHEDULED_LIVE: {
      ROOT: `${ROOT}/scheduled-live`,
      ACTION: (id: string) => `${ROOT}/scheduled-live/${id}/auction`,
      ACTION_ANALYTICS: (id: string) => `${ROOT}/scheduled-live/${id}/auction-analytics`,
    },
    SPONSORED: `${ROOT}/sponsored`,
    BANNERS: `${ROOT}/banners`,
    WALLET: `${ROOT}/wallet`,
  },
  SETTINGS: {
    ROOT: `${SETTINGS_ROOT}`,
    PROFILE: `${SETTINGS_ROOT}/profile`,
  },
  HELP: {
    ROOT: `${ROOT}/help`,
  },
  FEEDBACK: {
    ROOT: `${ROOT}/feedback`,
  },
};
