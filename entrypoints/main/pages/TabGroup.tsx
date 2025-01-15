import { useEffect } from "react";

import { useStore } from "../store";
import { TabList } from "../components/TabList";

export default function TabGroup() {
  const setTabs = useStore((state) => state.setTabs);
  const setGroups = useStore((state) => state.setGroups);

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

  return (
    <>
      <TabList />
    </>
  );
}
