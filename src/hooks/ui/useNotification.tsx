/* eslint-disable @typescript-eslint/no-unused-vars */
import { showNotification } from "@mantine/notifications";
import { IconX, IconCheck } from "@tabler/icons-react";

const useNotification = () => {
  const notification = {
    error: (title: string, message?: string, autoClose?: number | boolean) =>
      showNotification({
        title,
        message,
        color: "red",
        icon: <IconX />,
      }),
    success: (title: string, message?: string, autoClose?: number | boolean) =>
      showNotification({
        title,
        message,
        color: "green",
        icon: <IconCheck />,
      }),
    primary: (title: string, message?: string, autoClose?: number | boolean) =>
      showNotification({
        title,
        message,
      }),
  };
  return {
    notification,
  };
};

export default useNotification;
