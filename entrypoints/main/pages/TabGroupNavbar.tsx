import { useEffect, useState } from "react";
import { Button, Title } from "@mantine/core";

import { useStore } from "../store";

export default function TabGroupNavbar() {
  const groups = useStore((state) => state.groups);
  const groupId = useStore((state) => state.groupId);
  const setTabs = useStore((state) => state.setTabs);
  const setGroupId = useStore((state) => state.setGroupId);

  const handleTabGroupClick = async (tabGroupId?: number) => {
    const groupId = tabGroupId ?? chrome.tabGroups.TAB_GROUP_ID_NONE;
    console.log("groupId", groupId);
    setGroupId(groupId);
    const tabs = await browser.tabs.query({ groupId: groupId });
    console.log("tabs", tabs);
    setTabs(tabs);
  };

  return (
    <div>
      <div className="flex">
        <Title order={2}>Tab Groups: </Title>
      </div>
      <div>
        <Button
          onClick={() => handleTabGroupClick()}
          variant={groupId === chrome.tabGroups.TAB_GROUP_ID_NONE ? "filled" : "default"}
        >
          UnGrouped tabs
        </Button>
        {groups.map((group) => (
          <Button
            key={group.id}
            onClick={() => handleTabGroupClick(group.id)}
            variant={groupId === group.id ? "filled" : "default"}
          >
            {group.title}
          </Button>
        ))}
      </div>
    </div>
  );
}
