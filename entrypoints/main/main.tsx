import "./style.css";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";
import { createTheme, MantineProvider } from "@mantine/core";

import { CommonLayout } from "./layouts/common";
import App from "./pages/App";
import Space from "./pages/Space";
import TabGroup from "./pages/TabGroup";
import URLMan from "./pages/URLMan";

const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <HashRouter>
        <Routes>
          <Route element={<CommonLayout />}>
            <Route path="/" element={<App />} />
            <Route path="/spaces" element={<Space />} />
            <Route path="/tabgroups" element={<TabGroup />} />
            <Route path="/urls" element={<URLMan />} />
          </Route>
        </Routes>
      </HashRouter>
    </MantineProvider>
  </React.StrictMode>
);
