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

const Login = () => {
  const isMobile = useScreen();

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
          <TextInput label="Tên đăng nhập" placeholder="Tên đăng nhập" />
          <PasswordInput label="Mật khẩu" placeholder="Mật khẩu" />
          <Button> Đăng nhập</Button>
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default Login;
