import React from "react";
import ReactDOM from "react-dom/client";
import App from "pages/App/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "configs/configureStore";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/vi";
import {
  InputWrapper,
  MantineProvider,
  MantineThemeOverride,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";

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
    <Provider store={store}>
      <BrowserRouter>
        <MantineProvider theme={theme}>
          <Notifications
            autoClose={10000}
            position="top-right"
            zIndex={2077}
            containerWidth={350}
            limit={5}
            top={70}
          />
          <DatesProvider settings={{ locale: "vi" }}>
            <App />
          </DatesProvider>
        </MantineProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
