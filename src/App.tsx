import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AppRouter } from "./AppRoutes";
import { store } from "./store";
import { PaginationField } from "./components/Table/PaginationField/PaginationField";
import { EventLog } from "./components/EventLog";

export const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter> */}
      <EventLog />
      {/* </BrowserRouter> */}
    </Provider>
  </React.StrictMode>
);
