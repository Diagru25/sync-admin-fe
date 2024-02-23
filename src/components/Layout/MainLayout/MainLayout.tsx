import { FC } from "react";
import { Outlet } from "react-router-dom";

import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NavbarCustom from "components/Navbar";
import Header from "components/Header";

const MainLayout: FC = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

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
        <Header
          mobileOpened={mobileOpened}
          desktopOpened={desktopOpened}
          toggleDesktop={toggleDesktop}
          toggleMobile={toggleMobile}
        />
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
