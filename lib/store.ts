import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authApi } from "./service";
import { userApi } from "./service";
import authReducer from "./slice/authSlice";
import { adminApi } from "./service/adminApi";
import { settingApi } from "./service/user-api/settingsApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [settingApi.reducerPath]: settingApi.reducer,
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
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
