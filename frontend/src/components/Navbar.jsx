import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiBell,
  FiSearch,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { getFullName, logout } from "../services/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const titles = {
    "/dashboard": "Dashboard",
    "/projects": "Projects",
    "/tasks": "My Tasks",
    "/users": "Team",
    "/analytics": "Reports",
    "/settings": "Settings",
    "/profile": "Profile",
  };

  const pageTitle = titles[location.pathname] || "Dashboard";

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const initials = (getFullName() || "User")
    .split(" ")
    .map((x) => x[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <header className="topbar">

      <div className="topbar-left">

        <h2>{pageTitle}</h2>

        <div className="topbar-search">
          <FiSearch />
          <input
            type="text"
            placeholder="Search..."
          />
        </div>

      </div>

      <div className="topbar-right">

        <button className="nav-icon">
          <FiBell />
        </button>

        <div
          className="user-menu"
          ref={dropdownRef}
        >

          <button
            className="user-btn"
            onClick={() => setOpen(!open)}
          >

            <div className="user-avatar">
              {initials}
            </div>

           <span>{getFullName() || "User"}</span>

            <FiChevronDown />

          </button>

          {open && (
            <div className="user-dropdown">

              <div
                className="drop-item"
                onClick={() => {
                  navigate("/profile");
                  setOpen(false);
                }}
              >
                <FiUser />
                Profile
              </div>

              <div
                className="drop-item"
                onClick={() => {
                  navigate("/settings");
                  setOpen(false);
                }}
              >
                <FiSettings />
                Settings
              </div>

              <div
                className="drop-item logout"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                <FiLogOut />
                Logout
              </div>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}