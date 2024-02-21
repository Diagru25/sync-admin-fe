import { FC } from "react";
import { Outlet } from "react-router-dom";

import { AppShell, Burger, Group } from "@mantine/core";
// import { useScreen } from "hooks/ui";
import { useDisclosure } from "@mantine/hooks";
import NavbarCustom from "components/Navbar";

// import NavbarCustom from "components/Navbar";
// import HeaderCustom from "components/Header";

const MainLayout: FC = () => {
  // const [opened, setOpened] = useState(true);
  // const [isDisableButton, setIsDisableButton] = useState(true);

  // const isMobile = useScreen();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  // useEffect(() => {
  //   if (!largeScreen) {
  //     setOpened(false);
  //     setIsDisableButton(false);
  //   } else {
  //     setIsDisableButton(false);
  //   }
  //   return setOpened(true);
  // }, [largeScreen]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="sm"
    >
      <AppShell.Header>
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
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="xs">
        <NavbarCustom triggerBurger={toggleMobile} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
