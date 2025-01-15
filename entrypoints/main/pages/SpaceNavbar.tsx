import { useEffect, useState } from "react";
import { ActionIcon, Button, Modal, TextInput, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";

import { useStore } from "../store";

export default function SpaceNavbar() {
  const windows = useStore((state) => state.windows);
  const updateWindows = useStore((state) => state.updateWindows);
  const updateCurrentWindow = useStore((state) => state.updateCurrentWindow);
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      space: "",
    },
    validate: {
      space: (value) => (/^\S+$/.test(value) ? null : "Invalid space name"),
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

  return (
    <div>
      <div className="flex">
        <Title order={2}>Unsaved Spaces: </Title>
      </div>
      <div>
        {windows.map((window) => (
          <div key={window.id}>
            <h2 onClick={() => handleWindowClick(window)}>{window.tabs?.[0]?.title}</h2>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-end">
        <Title order={2}>Saved Spaces: </Title>
        <ActionIcon variant="subtle" aria-label="Adding" onClick={open}>
          <IconPlus />
        </ActionIcon>
      </div>
      <div className="list"></div>

      <Modal opened={opened} onClose={close} title="Create Space">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
