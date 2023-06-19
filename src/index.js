import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/style/common.css";
import Routing from "./routing/Routing";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routing />
  </BrowserRouter>
);
