// src/components/TaskCard.jsx

function TaskCard({
  task,
  provided,
  setSelected,
  setEditTitle,
  setEditDesc,
  setEditPriority,
  setEditStory,
}) {
  return (
    <div
      className="card"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => {
        setSelected(task);
        setEditTitle(task.title);
        setEditDesc(task.description);
        setEditPriority(task.priority);
        setEditStory(task.storyPoints);
      }}
    >
      <h5>{task.title}</h5>

      <div className="card-footer">

        <span className={`badge ${task.priority}`}>
          {task.priority}
        </span>

        <span className="story-points">
          SP {task.storyPoints}
        </span>

      </div>
    </div>
  );
}

export default TaskCard;