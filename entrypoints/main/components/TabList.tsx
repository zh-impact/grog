import { useEffect, useState } from "react";
import { Anchor, Avatar, Button, Combobox, InputBase, useCombobox } from "@mantine/core";

import { useStore } from "../store/store";

export function TabList() {
  const { groupId, groups, tabs, setGroupId, setGroups, setTabs } = useStore();

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
    setData(groups.map((group) => group.title ?? "untitled"));
  }, [groups]);

  const handleTabClick = (tab: chrome.tabs.Tab) => {
    browser.windows.update(tab.windowId ?? browser.windows.WINDOW_ID_CURRENT, {
      focused: true,
    });
    browser.tabs.update(tab.id ?? 0, { active: true });
  };

  const handleReopen = () => {
    browser.sessions.restore();
  }

  return (
    <ul className="flex flex-col gap-2">
      {tabs.map((tab) => (
        <li key={tab.id} className="flex gap-4 items-center">
          <Avatar src={tab.favIconUrl} size="xs" />
          <p className="cursor-pointer" onClick={() => handleTabClick(tab)}>
            {tab.title}
          </p>
          <Button onClick={() => browser.tabs.remove(tab.id ?? 0)}>close</Button>
          <Button onClick={() => handleReopen()}>Reopen</Button>

          {/* <Combobox
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
          </Combobox> */}
        </li>
      ))}
    </ul>
  );
}
