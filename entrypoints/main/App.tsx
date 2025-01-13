import { useEffect, useState } from "react";
import { Anchor, Avatar, Button } from "@mantine/core";

function App() {
  const [groups, setGroups] = useState<chrome.tabGroups.TabGroup[]>([]);
  const [groupId, setGroupId] = useState<number>(
    chrome.tabGroups.TAB_GROUP_ID_NONE
  );
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);

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
    <div className="p-4">
      <h1 className="text-3xl font-bold">All tabs</h1>

      <div className="flex gap-4 mb-4">
        <Button
          onClick={() => handleTabGroupClick()}
          variant={
            groupId === chrome.tabGroups.TAB_GROUP_ID_NONE
              ? "filled"
              : "default"
          }
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

      <ul className="flex flex-col gap-2">
        {tabs.map((tab) => (
          <li key={tab.id} className="flex gap-4 items-center">
            <Avatar src={tab.favIconUrl} size="xs" />
            <Anchor href={tab.url} target="_blank">
              {tab.title}
            </Anchor>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
