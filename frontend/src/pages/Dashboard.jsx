import React from "react";
import Mascot from "../components/Mascot";
import {
  getFullName,
  getDesignation,
  getDepartment,
  getTeam,
} from "../services/auth";

export default function Dashboard() {
  return (
    <div className="dashboard">

      {/* Hero Section */}

      <section className="hero">

        <div className="hero-left">

          <div className="hero-subtitle">
            👋 Welcome Back
          </div>

          <h1>
            {getFullName() || "User"}
          </h1>

          <p>
            {getDesignation()
              ? getDesignation().replaceAll("_", " ")
              : "Employee"}

            {getDepartment()
              ? ` • ${getDepartment()}`
              : ""}

            {getTeam()
              ? ` • ${getTeam()}`
              : ""}
          </p>

          <br />

          <p>
            Finish today's work and keep your sprint moving.
            You currently have <b>6 pending tasks</b> and
            <b> 3 active projects.</b>
          </p>

        </div>

        <div className="hero-right">
          <Mascot />
        </div>

      </section>

      {/* Stats */}

      <section className="stats-grid">

        <div className="stat-card">

          <div className="stat-label">
            Total Tasks
          </div>

          <div className="stat-value">
            24
          </div>

          <div className="stat-change">
            ↑ 12%
          </div>

        </div>

        <div className="stat-card">

          <div className="stat-label">
            Completed
          </div>

          <div className="stat-value">
            18
          </div>

          <div className="stat-change">
            ✔ On Track
          </div>

        </div>

        <div className="stat-card">

          <div className="stat-label">
            Pending
          </div>

          <div className="stat-value">
            6
          </div>

          <div className="stat-change">
            Sprint
          </div>

        </div>

        <div className="stat-card">

          <div className="stat-label">
            Projects
          </div>

          <div className="stat-value">
            3
          </div>

          <div className="stat-change">
            Active
          </div>

        </div>

      </section>

      {/* Bottom */}

      <section className="dashboard-grid">

        <div className="panel">

          <div className="panel-header">

            <h3>Recent Activity</h3>

          </div>

          <div className="panel-body">

            <div className="activity">

              <div className="activity-dot"></div>

              <div>

                <div className="activity-title">
                  JWT Authentication completed
                </div>

                <div className="activity-time">
                  10 minutes ago
                </div>

              </div>

            </div>

            <div className="activity">

              <div className="activity-dot"></div>

              <div>

                <div className="activity-title">
                  Sprint Planning Updated
                </div>

                <div className="activity-time">
                  Today • 09:45 AM
                </div>

              </div>

            </div>

            <div className="activity">

              <div className="activity-dot"></div>

              <div>

                <div className="activity-title">
                  New Task Assigned
                </div>

                <div className="activity-time">
                  Yesterday
                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="panel">

          <div className="panel-header">

            <h3>Upcoming</h3>

          </div>

          <div className="panel-body">

            <div className="deadline">

              <div>

                <div className="deadline-title">
                  Jira Replica
                </div>

                <div className="deadline-date">
                  Tomorrow
                </div>

              </div>

              <span className="priority high">
                HIGH
              </span>

            </div>

            <div className="deadline">

              <div>

                <div className="deadline-title">
                  UI Review
                </div>

                <div className="deadline-date">
                  Friday
                </div>

              </div>

              <span className="priority medium">
                MEDIUM
              </span>

            </div>

            <div className="deadline">

              <div>

                <div className="deadline-title">
                  Deployment
                </div>

                <div className="deadline-date">
                  Monday
                </div>

              </div>

              <span className="priority low">
                LOW
              </span>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}