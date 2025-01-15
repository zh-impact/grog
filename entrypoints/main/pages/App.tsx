import { useEffect, useState } from "react";
import { Anchor, Avatar, Button, Combobox, InputBase, useCombobox } from "@mantine/core";

import { useStore } from "../store/store";
import { TabList } from "../components/TabList";

function App() {
  const { groupId, groups, tabs, setGroupId, setGroups, setTabs } = useStore();

  useEffect(() => {
    (async () => {
      const tabs = await chrome.tabs.query({
        groupId: chrome.tabGroups.TAB_GROUP_ID_NONE,
      });
      console.log("tabs", tabs);
      setTabs(tabs);

      const groups = await browser.tabGroups.query({});
      console.log("groups", groups);
      setGroups(groups);
    })();
  }, []);

  useEffect(() => {
    const updater = async (activeInfo: chrome.tabs.TabActiveInfo) => {
      console.log("activeInfo", activeInfo);
      const tab = await browser.tabs.get(activeInfo.tabId);
      console.log("tab", tab.title, tab.url);
      const groups = await browser.tabGroups.query({});
      console.log("groups", groups, tab.groupId);
      groups.map((group) => {
        if (group.id === tab.groupId) {
          return;
        }
        browser.tabGroups.update(group.id, {
          collapsed: true,
        });
      });
    };

    browser.tabs.onActivated.addListener(updater);
    return () => {
      browser.tabs.onActivated.removeListener(updater);
    };
  }, []);

  const handleTabGroupClick = async (tabGroupId?: number) => {
    const groupId = tabGroupId ?? chrome.tabGroups.TAB_GROUP_ID_NONE;
    console.log("groupId", groupId);
    setGroupId(groupId);
    const tabs = await browser.tabs.query({ groupId: groupId });
    console.log("tabs", tabs);
    setTabs(tabs);
  };

  return (
    <>
      <div className="flex gap-4 mb-4 items-center">
        <h2>Groups: </h2>
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

      <TabList />
    </>
  );
}

export default App;
