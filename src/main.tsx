import React from "react";
import ReactDOM from "react-dom/client";
import App from "pages/App/App";
import { BrowserRouter } from "react-router-dom";
import {
  InputWrapper,
  MantineProvider,
  MantineThemeOverride,
} from "@mantine/core";
import "@mantine/core/styles.css";

const theme: MantineThemeOverride = {
  components: {
    InputWrapper: InputWrapper.extend({
      styles: {
        label: {
          fontWeight: 500,
        },
      },
    }),
  },
  // fontFamily:
  //   "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
