import { useEffect, useState } from "react";
import { Textarea } from "@mantine/core";

export default function URLMan() {
  return (
    <div className="">
      <h2>URLs: </h2>
      <Textarea
        label="Input label"
        description="Input description"
        placeholder="Input placeholder"
      />
    </div>
  );
}
