import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiMenu,
  FiHome,
  FiCheckSquare,
  FiFolder,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

export default function Sidebar({ sidebar, setSidebar }) {
  return (
    <aside className={`sidebar ${sidebar ? "" : "collapsed"}`}>

      <button
        className="menu-btn"
        onClick={() => setSidebar(!sidebar)}
      >
        <FiMenu />
      </button>

      {sidebar && (
        <h2 className="logo">
          JIRA<span style={{ color: "#818cf8" }}>.</span>
        </h2>
      )}

      <div className="menu-links">

        <NavLink to="/dashboard" className="menu-item">
          <FiHome />
          Dashboard
        </NavLink>

        <NavLink to="/tasks" className="menu-item">
          <FiCheckSquare />
          My Tasks
        </NavLink>

        <NavLink to="/projects" className="menu-item">
          <FiFolder />
          Projects
        </NavLink>

        <NavLink to="/users" className="menu-item">
          <FiUsers />
          Team
        </NavLink>

        <NavLink to="/analytics" className="menu-item">
          <FiBarChart2 />
          Reports
        </NavLink>

      </div>

      <div className="bottom-links">

        <NavLink to="/settings" className="menu-item">
          <FiSettings />
          Settings
        </NavLink>

        <NavLink to="/" className="menu-item">
          <FiLogOut />
          Logout
        </NavLink>

      </div>

    </aside>
  );
}