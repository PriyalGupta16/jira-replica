// src/components/TaskInput.jsx

function TaskInput({ title, setTitle, create }) {
  return (
    <div className="task-input">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title..."
        onKeyDown={(e) => {
          if (e.key === "Enter") create();
        }}
      />

      <button onClick={create}>
        + Create Task
      </button>
    </div>
  );
}

export default TaskInput;