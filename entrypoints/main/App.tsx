import { useEffect, useState } from "react";
import { Anchor, Avatar, Button, Combobox, InputBase, useCombobox } from "@mantine/core";

function App() {
  const [groups, setGroups] = useState<chrome.tabGroups.TabGroup[]>([]);
  const [groupId, setGroupId] = useState<number>(chrome.tabGroups.TAB_GROUP_ID_NONE);
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const exactOptionMatch = data.some((item) => item === search);
  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()));

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

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
      setData(groups.map((group) => group.title ?? "untitled"));
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

      <ul className="flex flex-col gap-2">
        {tabs.map((tab) => (
          <li key={tab.id} className="flex gap-4 items-center">
            <Avatar src={tab.favIconUrl} size="xs" />
            <Anchor href={tab.url} target="_blank">
              {tab.title}
            </Anchor>
            <Button onClick={() => browser.tabs.remove(tab.id ?? 0)}>close</Button>
            <Combobox
              store={combobox}
              withinPortal={false}
              onOptionSubmit={(val) => {
                if (val === "$create") {
                  setData((current) => [...current, search]);
                  setValue(search);
                } else {
                  setValue(val);
                  setSearch(val);
                }

                combobox.closeDropdown();
              }}
            >
              <Combobox.Target>
                <InputBase
                  rightSection={<Combobox.Chevron />}
                  value={search}
                  onChange={(event) => {
                    combobox.openDropdown();
                    combobox.updateSelectedOptionIndex();
                    setSearch(event.currentTarget.value);
                  }}
                  onClick={() => combobox.openDropdown()}
                  onFocus={() => combobox.openDropdown()}
                  onBlur={() => {
                    combobox.closeDropdown();
                    setSearch(value || "");
                  }}
                  placeholder="Search value"
                  rightSectionPointerEvents="none"
                />
              </Combobox.Target>

              <Combobox.Dropdown>
                <Combobox.Options>
                  {options}
                  {!exactOptionMatch && search.trim().length > 0 && (
                    <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
                  )}
                </Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
