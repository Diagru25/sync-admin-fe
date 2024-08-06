import { request } from "apis/base";
import { ChangePassType } from "constants/types/user";

export const userApi = {
  updatePassword: (userId: string | number, data: ChangePassType) => {
    return request({
      url: `/user/update/${userId}`,
      method: "PUT",
      data,
    });
  },
};
