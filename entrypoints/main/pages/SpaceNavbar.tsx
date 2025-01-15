import { useEffect, useState } from "react";
import { Anchor, Avatar, Button, Combobox, InputBase, useCombobox } from "@mantine/core";

export default function SpaceNavbar() {
  return (
    <div className="">
      <div className="flex">
        <h2>Unsaved Spaces: </h2>+
      </div>

      <div className="flex">
        <h2>Saved Spaces: </h2>+
      </div>
    </div>
  );
}
