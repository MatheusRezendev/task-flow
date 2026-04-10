// import { TaskForm } from "./components/TaskForm";
// import { TaskItem } from "./components/TaskItem";
import { useState } from "react";
import { TaskList } from "./components/TaskList";
import { TaskStats } from "./components/TaskStats";

import type { Task } from "./types/task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;

  const handleAddTask = (title:string, description:string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
    }
    
    setTasks((prevTasks) => [...prevTasks, newTask]);
  } 

  return (
    <>
      <TaskStats total={total} completed={completed} pending={pending}/>
      <TaskList tasks={tasks} onAddTask={handleAddTask} />
    </>
  )
}

export default App
