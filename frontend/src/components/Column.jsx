import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

function Column({
    status,
    label,
    tasks,
    setSelected,
    setEditTitle,
    setEditDesc,
    setEditPriority,
    setEditStory
}) {

    const items = tasks.filter(t => t.status === status);

    return (
        <Droppable droppableId={status}>
            {(p) => (
                <div
                    className="column"
                    ref={p.innerRef}
                    {...p.droppableProps}
                >

                    <h4>{label}</h4>

                    {items.map((t, i) => (

                        <Draggable
                            key={t.id}
                            draggableId={String(t.id)}
                            index={i}
                        >
                            {(d) => (

                                <TaskCard
                                    task={t}
                                    provided={d}
                                    setSelected={setSelected}
                                    setEditTitle={setEditTitle}
                                    setEditDesc={setEditDesc}
                                    setEditPriority={setEditPriority}
                                    setEditStory={setEditStory}
                                />

                            )}
                        </Draggable>

                    ))}

                    {p.placeholder}

                </div>
            )}
        </Droppable>
    );

}

export default Column;