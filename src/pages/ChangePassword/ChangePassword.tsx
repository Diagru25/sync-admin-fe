/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState } from "react";
import { Button, Title, PasswordInput, Stack, Container } from "@mantine/core";
import { userApi } from "apis/userApi";
import { useNotification } from "hooks/ui";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ChangePassType } from "constants/types/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "configs/configureStore";
import { logout } from "redux/auth/slice";

type FormData = {
  newPassword: string;
  confirmNewPassword: string;
};

const formSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Mật khẩu mới không được để trống.")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  confirmNewPassword: Yup.string()
    .required("Mật khẩu không được để trống")
    .test(
      "check-confirm-pass",
      "Xác nhận mật khẩu mới không chính xác",
      function (code): boolean {
        const { newPassword } = this.parent;
        return code === newPassword;
      }
    ),
});
const initialValue: FormData = {
  newPassword: "",
  confirmNewPassword: "",
};

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { notification } = useNotification();
  const { user } = useSelector((state: RootState) => state.authSlice);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useFormik({
    initialValues: initialValue,
    validationSchema: formSchema,
    validateOnChange: true,
    onSubmit: async (data: FormData) => {
      try {
        setIsLoading(true);
        const changePassData: ChangePassType = {
          newPassword: data.newPassword,
        };

        const res = await userApi.updatePassword(
          user?.UserId || "",
          changePassData
        );

        if (res?.data?.success === true) {
          notification.success("Thông báo", "Đổi mật khẩu thành công!");
          dispatch(logout());
        } else notification.error("Đổi mật khẩu thất bại", res?.data?.message);

        setIsLoading(false);
      } catch (error) {
        //console.log(error);
        setIsLoading(false);
      }
    },
  });

  return (
    <Fragment>
      <Title order={3}>Đổi mật khẩu</Title>
      <Container size="25rem">
        <Stack>
          <PasswordInput
            name="newPassword"
            label="Mật khẩu mới"
            placeholder="Mật khẩu mới"
            error={
              form.errors.newPassword && form.touched.newPassword
                ? form.errors.newPassword
                : ""
            }
            value={form.values.newPassword}
            onChange={form.handleChange}
          />
          <PasswordInput
            name="confirmNewPassword"
            label="Xác nhận mật khẩu mới"
            placeholder="Xác nhận mật khẩu mới"
            error={
              form.errors.confirmNewPassword && form.touched.confirmNewPassword
                ? form.errors.confirmNewPassword
                : ""
            }
            value={form.values.confirmNewPassword}
            onChange={form.handleChange}
          />
          <Button loading={isLoading} onClick={form.submitForm}>
            Đổi mật khẩu
          </Button>
        </Stack>
      </Container>
    </Fragment>
  );
};

export default ChangePassword;
