import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/custom/header/Header";
import "./cms.css";

function Cms() {
  return (
    <>
      <Header />
      <main id="main" className="container">
        <Outlet />
      </main>
    </>
  );
}

export default Cms;
