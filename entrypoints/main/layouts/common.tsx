import { useMemo } from "react";
import { Outlet, NavLink, Routes, Route, useLocation } from "react-router";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import SpaceNavbar from "../pages/SpaceNavbar";

export function CommonLayout() {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();

  const collapsedNavbar = useMemo(() => {
    return location.pathname !== "/spaces";
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
          <h1 className="text-3xl font-bold">Grog Manager</h1>
          <NavLink to="/">TabGroups</NavLink>
          <NavLink to="/urls">URLs</NavLink>
          <NavLink to="/spaces">Spaces</NavLink>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Routes>
          <Route path="/" element={<h1>TabGroups</h1>} />
          <Route path="/urls" element={<h1>URLs</h1>} />
          <Route path="/spaces" element={<SpaceNavbar />} />
        </Routes>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
