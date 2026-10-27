import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function ProtectedLayout({ children }) {

  const [sidebar, setSidebar] = useState(true);

  return (
    <>
      <Sidebar
        sidebar={sidebar}
        setSidebar={setSidebar}
      />

      <div className={`main ${sidebar ? "" : "shift"}`}>
        <Navbar />

        <div className="page-content">
          {children}
        </div>
      </div>
    </>
  );
}