import { useEffect, useState } from "react";
import { Anchor, Avatar, Button } from "@mantine/core";

import { useStore } from "../store";

export default function Spaces() {
  const currentWindow = useStore((state) => state.currentWindow);

  const handleTabClick = (tab: chrome.tabs.Tab) => {
    browser.windows.update(tab.windowId ?? browser.windows.WINDOW_ID_CURRENT, {
      focused: true,
    });
    browser.tabs.update(tab.id ?? 0, { active: true });
  };

  return (
    <div className="">
      <h2>Spaces: </h2>
      <div>
        {currentWindow?.tabs?.map((tab) => (
          <li key={tab.id} className="flex gap-4 items-center">
            <Avatar src={tab.favIconUrl} size="xs" />
            <p className="cursor-pointer" onClick={() => handleTabClick(tab)}>{tab.title}</p>
            {/* <Button onClick={() => browser.tabs.remove(tab.id ?? 0)}>close</Button> */}
          </li>
        ))}
      </div>
    </div>
  );
}
