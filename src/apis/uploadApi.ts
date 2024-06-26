import { request } from "apis/base";

export const uploadApi = {
  uploadBrdc: (file: File, filename: string) => {
    const formData = new FormData();
    formData.append("file", file, filename);
    return request({
      url: "/api/upload",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
  },
};
