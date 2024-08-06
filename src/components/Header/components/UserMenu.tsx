import { Avatar, Group, Menu, Stack, Text } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { IconLogout, IconKey } from "@tabler/icons-react";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "redux/auth/slice";
import classes from "components/Header/components/UserMenu.module.css";
import { RootState } from "configs/configureStore";
import { useNavigate } from "react-router-dom";
import { CHANGE_PASSWORD } from "routes/route.constant";

export const UserMenu: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.authSlice);
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  return (
    <Menu shadow="md" opened={opened}>
      <Menu.Target>
        <Group
          className={classes.root}
          ref={ref}
          gap="sm"
          onClick={() => setOpened(!opened)}
        >
          <Avatar size="md" radius="xl"></Avatar>

          <Stack gap={0} visibleFrom="sm">
            <Text fw={500}>{user?.Username}</Text>
          </Stack>
        </Group>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Thông tin</Menu.Label>
        <Menu.Item
          leftSection={<IconKey size={14} />}
          onClick={() => navigate(CHANGE_PASSWORD)}
        >
          Đổi mật khẩu
        </Menu.Item>
        <Menu.Divider />

        <Menu.Item
          color="red"
          leftSection={<IconLogout size={14} />}
          onClick={() => dispatch(logout())}
        >
          Đăng xuất
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
