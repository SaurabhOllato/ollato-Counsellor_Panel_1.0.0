import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-content">
        <Header />
        <main className="layout-main">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
