import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; name: string; email: string; avatarUrl?: string } | null;
  role: "USER" | "ADMIN" | "ADVERTISER" | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  role: null,
};

export const authSclie = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: { id: string; name: string; email: string; avatarUrl?: string };
        role: "USER" | "ADMIN" | "ADVERTISER";
      }>,
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
    },
  },
});

export const { setCredentials, logout } = authSclie.actions;
export default authSclie.reducer;
