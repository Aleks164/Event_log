import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AppRouter } from "./AppRoutes";
import { store } from "./store";
import { Table } from "./components/Table/Table";

export const App = () => (
  <React.StrictMode>
    {/* <Provider store={store}> */}
    {/* <BrowserRouter> */}
    <Table />
    {/* </BrowserRouter> */}
    {/* </Provider> */}
  </React.StrictMode>
);
