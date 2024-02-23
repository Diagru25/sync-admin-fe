import { Burger, Group, Text } from "@mantine/core";
import { FC } from "react";
import { UserMenu } from "components/Header/components/UserMenu";

interface HeaderProps {
  mobileOpened: boolean;
  desktopOpened: boolean;
  toggleMobile: () => void;
  toggleDesktop: () => void;
}
const Header: FC<HeaderProps> = ({
  mobileOpened,
  desktopOpened,
  toggleDesktop,
  toggleMobile,
}) => {
  return (
    <Group
      justify="space-between"
      style={{ height: "100%", padding: "0px 20px", position: "relative" }}
    >
      <Group h="100%" px="md">
        <Burger
          opened={mobileOpened}
          onClick={toggleMobile}
          hiddenFrom="sm"
          size="sm"
        />
        <Burger
          opened={desktopOpened}
          onClick={toggleDesktop}
          visibleFrom="sm"
          size="sm"
        />
        <Text
          size="1.5rem"
          fw={900}
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
          ta="center"
          my="xs"
        >
          CMD
        </Text>
      </Group>
      <Group align="center">
        <UserMenu />
      </Group>
    </Group>
  );
};

export default Header;
