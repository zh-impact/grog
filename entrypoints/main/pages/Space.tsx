import { useEffect, useState } from "react";
import { Anchor, Avatar, Button, Combobox, InputBase, useCombobox } from "@mantine/core";

import { useStore } from "../store";

export default function Spaces() {
  const currentWindow = useStore((state) => state.currentWindow);

  return (
    <div className="">
      <h2>Spaces: </h2>
      <div>
        {currentWindow?.tabs?.map((tab) => (
          <li key={tab.id} className="flex gap-4 items-center">
            <Avatar src={tab.favIconUrl} size="xs" />
            <p className="cursor-pointer">{tab.title}</p>
            <Button onClick={() => browser.tabs.remove(tab.id ?? 0)}>close</Button>
          </li>
        ))}
      </div>
    </div>
  );
}
