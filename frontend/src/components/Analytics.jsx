import React from "react";

export default function Analytics() {
  return (
    <div className="container mt-4">
      <h2>📊 Analytics Dashboard</h2>

      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card shadow-sm p-3">
            <h5>Total Tasks</h5>
            <h2>0</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3">
            <h5>Completed</h5>
            <h2>0</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3">
            <h5>In Progress</h5>
            <h2>0</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3">
            <h5>Pending</h5>
            <h2>0</h2>
          </div>
        </div>
      </div>

      <div className="card shadow-sm mt-4 p-4">
        <h4>Analytics</h4>
        <p>Charts and project insights will be added here.</p>
      </div>
    </div>
  );
}