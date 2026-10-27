import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div className="app-layout">

      <Sidebar
        sidebar={sidebar}
        setSidebar={setSidebar}
      />

      <div className={`main ${sidebar ? "" : "shift"}`}>
        <Outlet />
      </div>

    </div>
  );
}