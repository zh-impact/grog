import "./style.css";
import "@mantine/core/styles.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";
import { createTheme, MantineProvider } from "@mantine/core";

import { CommonLayout } from "./layouts/common";
import App from "./App";
import URLManager from "./pages/URLManager";
import Spaces from "./pages/Spaces";

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
            <Route path="/urls" element={<URLManager />} />
            <Route path="/spaces" element={<Spaces />} />
          </Route>
        </Routes>
      </HashRouter>
    </MantineProvider>
  </React.StrictMode>
);
