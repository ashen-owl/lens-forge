import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "./index.css";
import "./__antd.scss";
import "./theme.scss";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { ConfigProvider } from "antd";

const container = document.getElementById("lensforge");

if (container) {
  const root = ReactDOM.createRoot(container);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#0f766e",
              borderRadius: 12,
            },
            components: {
              Slider: {
                railSize: 5,
                handleLineWidthHover: 0,
              },
            },
          }}
        >
          <App />
        </ConfigProvider>
      </Provider>
    </React.StrictMode>
  );
}
