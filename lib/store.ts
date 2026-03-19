import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authApi, categoryApi } from "./service";
import { userApi } from "./service";
import authReducer from "./slice/authSlice";
import { adminApi } from "./service/adminApi";
import { settingApi } from "./service/user-api/settingsApi";
import { channelApi } from "./service/user-api/channelApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [settingApi.reducerPath]: settingApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [channelApi.reducerPath]: channelApi.reducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      adminApi.middleware,
      settingApi.middleware,
      categoryApi.middleware,
      channelApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
