import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Projects() {
  const emptyProject = {
    name: "",
    description: ""
  };

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const saveProject = async () => {
    if (!project.name.trim()) {
      alert("Project name is required");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, project);
      } else {
        await api.post("/projects", project);
      }

      setProject(emptyProject);
      setEditingId(null);
      loadProjects();

    } catch (err) {
      console.log(err);
      alert("Unable to save project");
    }
  };

  const editProject = (p) => {
    setProject({
      name: p.name,
      description: p.description
    });

    setEditingId(p.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const deleteProject = async (id) => {

    if (!window.confirm("Delete this project?")) return;

    try {
      await api.delete(`/projects/${id}`);
      loadProjects();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>📁 Projects</h2>

        <input
          className="form-control"
          style={{ width: "280px" }}
          placeholder="🔍 Search Project"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="card shadow-sm p-4 mb-4">

        <h4 className="mb-3">
          {editingId ? "✏ Update Project" : "➕ Create Project"}
        </h4>

        <input
          className="form-control mb-3"
          placeholder="Project Name"
          value={project.name}
          onChange={(e) =>
            setProject({
              ...project,
              name: e.target.value
            })
          }
        />

        <textarea
          rows="3"
          className="form-control mb-3"
          placeholder="Project Description"
          value={project.description}
          onChange={(e) =>
            setProject({
              ...project,
              description: e.target.value
            })
          }
        />

        <button
          className={`btn ${
            editingId ? "btn-warning" : "btn-primary"
          }`}
          onClick={saveProject}
        >
          {editingId ? "Update Project" : "Create Project"}
        </button>

      </div>

      <div className="row">

        {filteredProjects.length === 0 && (
          <h5 className="text-center text-muted">
            No Projects Found
          </h5>
        )}

        {filteredProjects.map((p) => (

          <div className="col-lg-4 col-md-6 mb-4" key={p.id}>

            <div
              className="card shadow-sm border-0 h-100"
              style={{ borderRadius: "15px" }}
            >

              <div className="card-body">

                <div className="d-flex justify-content-between">

                  <h4>{p.name}</h4>

                  <span className="badge bg-success">
                    Active
                  </span>

                </div>

                <p
                  className="text-muted mt-3"
                  style={{ minHeight: "60px" }}
                >
                  {p.description}
                </p>

                <hr />

                <div className="d-flex justify-content-between">

                  <small>
                    📅 Today
                  </small>

                  <small>
                    👤 Admin
                  </small>

                </div>

                <div className="mt-4 d-flex justify-content-between">

                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => editProject(p)}
                  >
                    ✏ Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProject(p.id)}
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}