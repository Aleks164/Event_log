import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AppRouter } from "./AppRoutes";
import { store } from "./store";
import { PaginationField } from "./components/Table/PaginationField";

export const App = () => (
  <React.StrictMode>
    {/* <Provider store={store}> */}
    {/* <BrowserRouter> */}
    <PaginationField />
    {/* </BrowserRouter> */}
    {/* </Provider> */}
  </React.StrictMode>
);
