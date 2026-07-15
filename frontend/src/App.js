
import React,{useState,useEffect} from "react";
import axios from "axios";
import {DragDropContext,Droppable,Draggable} from "react-beautiful-dnd";

const API="http://localhost:8080/api/tasks";

export default function App(){

const [tasks,setTasks]=useState([]);
const [title,setTitle]=useState("");
const [sidebar,setSidebar]=useState(true);

const [selected,setSelected]=useState(null);
const [editTitle,setEditTitle]=useState("");
const [editDesc,setEditDesc]=useState("");
const [editPriority,setEditPriority]=useState("MEDIUM");
const [editStory,setEditStory]=useState(3);

const load=async()=>{
const r=await axios.get(API);
setTasks(r.data);
}

useEffect(()=>{load()},[]);

const create=async()=>{

await axios.post(API,{
title:title,
description:"New task",
status:"TODO",
priority:"MEDIUM",
storyPoints:3,
assignee:"User"
})

setTitle("");
load();
}

const dragEnd=async(res)=>{

if(!res.destination) return;

const id=res.draggableId;
const status=res.destination.droppableId;

const t=tasks.find(x=>String(x.id)===id);

await axios.put(`${API}/${id}`,{...t,status});

load();
}

const saveTask=async()=>{

await axios.put(`${API}/${selected.id}`,{
...selected,
title:editTitle,
description:editDesc,
priority:editPriority,
storyPoints:editStory
})

setSelected(null)
load()
}

const column=(status,label)=>{

const items=tasks.filter(t=>t.status===status);

return(

<Droppable droppableId={status}>
{p=>(
<div className="column" ref={p.innerRef} {...p.droppableProps}>

<h4>{label}</h4>

{items.map((t,i)=>(

<Draggable key={t.id} draggableId={String(t.id)} index={i}>
{d=>(
<div className="card"
ref={d.innerRef}
{...d.draggableProps}
{...d.dragHandleProps}
onClick={()=>{
setSelected(t)
setEditTitle(t.title)
setEditDesc(t.description)
setEditPriority(t.priority)
setEditStory(t.storyPoints)
}}
>

<b>{t.title}</b>
<div className={`badge ${t.priority}`}>
  {t.priority}
</div>
<div>SP: {t.storyPoints}</div>

</div>
)}
</Draggable>

))}

{p.placeholder}

</div>
)}
</Droppable>

)
}

return(

<div>

<div className={`sidebar ${sidebar ? "" : "collapsed"}`}>
<button onClick={()=>setSidebar(!sidebar)}>☰</button>
{sidebar && (
<>
<h3>Jira</h3>
<p>Board</p>
<p>Sprints</p>
<p>Reports</p>
</>
)}
</div>

<div className={`main ${sidebar ? "" : "shift"}`}>

<div className="task-input">
<input
value={title}
onChange={e=>setTitle(e.target.value)}
placeholder="Create task"
/>

<button onClick={create}>Add</button>
</div>

<DragDropContext onDragEnd={dragEnd}>

<div className="board">

{column("TODO","TODO")}
{column("IN_PROGRESS","IN PROGRESS")}
{column("DONE","DONE")}

</div>

</DragDropContext>

</div>

{selected && (

<div className="modal">

<h3>Edit Task</h3>

<input
value={editTitle}
onChange={e=>setEditTitle(e.target.value)}
/>

<textarea
value={editDesc}
onChange={e=>setEditDesc(e.target.value)}
/>

<select
value={editPriority}
onChange={e=>setEditPriority(e.target.value)}
>
<option>LOW</option>
<option>MEDIUM</option>
<option>HIGH</option>
</select>

<input
type="number"
value={editStory}
onChange={e=>setEditStory(e.target.value)}
/>

<button onClick={saveTask}>Save</button>
<button onClick={()=>setSelected(null)}>Cancel</button>

</div>

)}

</div>

)
}
