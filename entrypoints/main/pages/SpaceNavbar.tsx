import { useEffect, useState } from "react";
import { ActionIcon, Button, Modal, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";

import { useStore } from "../store";

export default function SpaceNavbar() {
  const spaces = useStore((state) => state.spaces);
  const windows = useStore((state) => state.windows);
  const updateSpaces = useStore((state) => state.updateSpaces);
  const updateWindows = useStore((state) => state.updateWindows);
  const updateCurrentWindow = useStore((state) => state.updateCurrentWindow);
  const updateCurrentSpace = useStore((state) => state.updateCurrentSpace);
  const [opened, { open, close }] = useDisclosure(false);

  const spaceNameValidator = (value: string) => {
    switch (true) {
      case !value:
        return "Space name cannot be empty";
      case spaces.includes(value):
        return "Space name already exists";
      default:
        return /^\S+$/.test(value) ? null : "Invalid space name";
    }
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      space: "",
    },
    validate: {
      space: spaceNameValidator,
    },
  });

  useEffect(() => {
    (async () => {
      const windows = await chrome.windows.getAll({ populate: true });
      updateWindows(windows);
    })();
  }, []);

  const handleWindowClick = (window: chrome.windows.Window) => {
    updateCurrentWindow(window);
  };

  const handleSpaceCreate = (space: string) => {
    console.log("space", space);
    updateSpaces([...spaces, space]);
  };

  return (
    <div>
      <div className="flex">
        <Title order={2}>Unsaved Spaces: </Title>
      </div>
      <div>
        {windows.map((window) => (
          <div key={window.id} className="cursor-pointer">
            <p onClick={() => handleWindowClick(window)}>{window.tabs?.[0]?.title}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <Title order={2}>Saved Spaces: </Title>
        <ActionIcon variant="subtle" aria-label="Adding" onClick={open}>
          <IconPlus />
        </ActionIcon>
      </div>
      <div className="list">
        <ul>
          {spaces.map((space) => (
            <li key={space} className="cursor-pointer">
              {space}
            </li>
          ))}
        </ul>
      </div>

      <Modal opened={opened} onClose={close} title="Create Space">
        <form onSubmit={form.onSubmit((values) => handleSpaceCreate(values.space))}>
          <TextInput
            withAsterisk
            label="Space Name"
            placeholder="Space Name"
            key={form.key("space")}
            {...form.getInputProps("space")}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Modal>
    </div>
  );
}
