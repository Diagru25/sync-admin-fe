import { request } from "apis/base";

export const fileApi = {
  delete: (filename: string) => {
    return request({
      url: `/api/delete/${filename}`,
      method: "DELETE",
    });
  },
};
