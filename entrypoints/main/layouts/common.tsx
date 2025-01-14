import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router";
import { Anchor, Avatar, Button, Combobox, InputBase, useCombobox } from "@mantine/core";

export function CommonLayout() {
  return (
    <div className="p-2">
      <section className="flex gap-4 mb-4 items-center">
        <h1 className="text-3xl font-bold">Grog Manager</h1>

        <NavLink to="/">Tab Manager</NavLink>
        <NavLink to="/url-manager">URL Manager</NavLink>
      </section>

      <Outlet />
    </div>
  );
}
