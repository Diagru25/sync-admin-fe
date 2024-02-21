/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ACCESS_TOKEN } from "constants/common/common";
import { LoginData } from "constants/types/auth";
import { UserType } from "constants/types/user";

const checkToken = (): boolean => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  return token ? true : false;
};

interface AuthState {
  isLoggedIn: boolean;
  user?: UserType;
}

const initialState: AuthState = {
  isLoggedIn: checkToken(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<LoginData>) => {
      return state;
    },
    logout: (state: AuthState) => {
      return state;
    },
    checkSession: (state: AuthState) => {
      return state;
    },
    updateState: (state: AuthState, action: PayloadAction<any>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { login, logout, checkSession, updateState } = authSlice.actions;
export default authSlice.reducer;
