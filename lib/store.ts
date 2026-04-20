import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authApi, categoryApi } from "./service";
import { userApi } from "./service";
import authReducer from "./slice/authSlice";
import { adminApi } from "./service/adminApi";
import { settingApi } from "./service/user-api/settingsApi";
import { channelApi } from "./service/user-api/channelApi";
import { liveApi } from "./service/user-api/liveApi";
import { scheduledLiveApi } from "./service/advertisre-api";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [liveApi.reducerPath]: liveApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [settingApi.reducerPath]: settingApi.reducer,
  [channelApi.reducerPath]: channelApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [scheduledLiveApi.reducerPath]: scheduledLiveApi.reducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      liveApi.middleware,
      adminApi.middleware,
      settingApi.middleware,
      channelApi.middleware,
      categoryApi.middleware,
      scheduledLiveApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
