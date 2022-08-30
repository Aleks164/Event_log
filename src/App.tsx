import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { EventLog } from "./components/EventLog";

export const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <EventLog />
    </Provider>
  </React.StrictMode>
);
