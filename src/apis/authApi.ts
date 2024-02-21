import { request } from "apis/base";
import { LoginData } from "constants/types/auth";

export const authApi = {
  login: (data: LoginData) => {
    return request({
      url: "/auth/login",
      method: "POST",
      data,
    });
  },
  logout: () => {
    return request({
      url: "/auth/sign_out",
      method: "POST",
    });
  },
  checkSession: () => {
    return request({
      url: "/auth/check_session",
      method: "GET",
    });
  },
};
