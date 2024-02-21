import {
  Button,
  Flex,
  PasswordInput,
  TextInput,
  Text,
  Image,
  Center,
} from "@mantine/core";
import { Fragment } from "react";
import viteLogo from "/vite.svg";
import { useScreen } from "hooks/ui";
import { login } from "redux/auth/slice";
import { LoginData } from "constants/types/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "configs/configureStore";
import { Navigate } from "react-router-dom";
import { DEFAULT } from "routes/route.constant";

type FormLoginData = {
  accessValue: string;
  password: string;
};

const loginSchema = Yup.object().shape({
  accessValue: Yup.string().required("Số điện thoại không được để trống."),
  password: Yup.string().required("Mật khẩu không được để trống"),
});

const Login = () => {
  const isMobile = useScreen();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.authSlice);

  const initialValue: FormLoginData = {
    accessValue: "",
    password: "",
  };

  const handleLogin = (data: LoginData) => {
    dispatch(login(data));
  };

  const formLogin = useFormik({
    initialValues: initialValue,
    validationSchema: loginSchema,
    onSubmit: async (data) => {
      try {
        const loginData: LoginData = {
          username: data.accessValue,
          password: data.password,
        };
        handleLogin(loginData);
      } catch (error) {
        //console.log(error);
      }
    },
  });

  if (isLoggedIn) return <Navigate to={DEFAULT} />;

  return (
    <Fragment>
      <Flex w="100vw" h="100vh" justify="center" align="center">
        <Flex
          w="90%"
          maw={400}
          gap="md"
          direction="column"
          p="md"
          styles={{
            root: { transform: `translate(0, ${isMobile ? "-20%" : "-50%"})` },
          }}
        >
          <Center>
            <Image src={viteLogo} alt="logo" w="48px" h="48px" />
          </Center>

          <Text
            size="1.5rem"
            fw={900}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
            ta="center"
            my="xs"
          >
            Quản lý
          </Text>
          <TextInput
            name="accessValue"
            label="Tên đăng nhập"
            placeholder="Tên đăng nhập"
            error={
              formLogin.errors.accessValue && formLogin.touched.accessValue
                ? formLogin.errors.accessValue
                : ""
            }
            value={formLogin.values.accessValue}
            onChange={formLogin.handleChange}
          />
          <PasswordInput
            name="password"
            label="Mật khẩu"
            placeholder="Mật khẩu"
            error={
              formLogin.errors.password && formLogin.touched.password
                ? formLogin.errors.password
                : ""
            }
            value={formLogin.values.password}
            onChange={formLogin.handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                formLogin.submitForm();
              }
            }}
          />
          <Button onClick={formLogin.submitForm}> Đăng nhập</Button>
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default Login;
