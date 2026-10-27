import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";

import TaskInput from "../components/TaskInput";
import Column from "../components/Column";

const API = "http://localhost:8080/api/tasks";

export default function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [selected, setSelected] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editPriority, setEditPriority] = useState("MEDIUM");
  const [editStory, setEditStory] = useState(3);

  const load = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {

    if (!title.trim()) return;

    await axios.post(API, {
      title,
      description: "New task",
      status: "TODO",
      priority: "MEDIUM",
      storyPoints: 3,
      assignee: "User"
    });

    setTitle("");
    load();
  };

  const dragEnd = async (result) => {

    if (!result.destination) return;

    const id = result.draggableId;
    const status = result.destination.droppableId;

    const task = tasks.find(t => String(t.id) === id);

    await axios.put(`${API}/${id}`, {
      ...task,
      status
    });

    load();
  };

  const saveTask = async () => {

    await axios.put(`${API}/${selected.id}`, {
      ...selected,
      title: editTitle,
      description: editDesc,
      priority: editPriority,
      storyPoints: Number(editStory)
    });

    setSelected(null);
    load();
  };

  return (
    <>
      <TaskInput
        title={title}
        setTitle={setTitle}
        create={create}
      />

      <DragDropContext onDragEnd={dragEnd}>
        <div className="board">

          <Column
            status="TODO"
            label="📝 To Do"
            tasks={tasks}
            setSelected={setSelected}
            setEditTitle={setEditTitle}
            setEditDesc={setEditDesc}
            setEditPriority={setEditPriority}
            setEditStory={setEditStory}
          />

          <Column
            status="IN_PROGRESS"
            label="🚀 In Progress"
            tasks={tasks}
            setSelected={setSelected}
            setEditTitle={setEditTitle}
            setEditDesc={setEditDesc}
            setEditPriority={setEditPriority}
            setEditStory={setEditStory}
          />

          <Column
            status="DONE"
            label="✅ Done"
            tasks={tasks}
            setSelected={setSelected}
            setEditTitle={setEditTitle}
            setEditDesc={setEditDesc}
            setEditPriority={setEditPriority}
            setEditStory={setEditStory}
          />

        </div>
      </DragDropContext>

      {selected && (
        <div className="modal">
          <div className="modal-content">

            <h3>Edit Task</h3>

            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Task Title"
            />

            <textarea
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              placeholder="Task Description"
            />

            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
            >
              <option>LOW</option>
              <option>MEDIUM</option>
              <option>HIGH</option>
            </select>

            <input
              type="number"
              value={editStory}
              onChange={(e) => setEditStory(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={saveTask}>
                Save Changes
              </button>

              <button onClick={() => setSelected(null)}>
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </>
  );
}