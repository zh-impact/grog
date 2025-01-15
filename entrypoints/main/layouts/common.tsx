import { useMemo } from "react";
import { Outlet, NavLink, Routes, Route, useLocation } from "react-router";
import { AppShell, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import SpaceNavbar from "../pages/SpaceNavbar";
import TabGroupNavbar from "../pages/TabGroupNavbar";

const showNavBarUrls = ["/spaces", "/tabgroups"];

export function CommonLayout() {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();

  const collapsedNavbar = useMemo(() => {
    return !showNavBarUrls.includes(location.pathname);
  }, [location]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: collapsedNavbar },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={1}>Grog</Title>
          <NavLink to="/spaces">Spaces</NavLink>
          <NavLink to="/tabgroups">TabGroups</NavLink>
          <NavLink to="/urls">URLs</NavLink>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Routes>
          <Route path="/spaces" element={<SpaceNavbar />} />
          <Route path="/tabgroups" element={<TabGroupNavbar />} />
        </Routes>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
