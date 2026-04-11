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

  const handleRemoveTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
  }

  const handleToggleTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.map(task => {
      if(task.id === taskId){
        return {
          ...task,
          completed: !task.completed,
        }
      }
      return task;
    }))
  };


  return (
    <>
      <TaskStats total={total} completed={completed} pending={pending}/>
      <TaskList tasks={tasks} onAddTask={handleAddTask} onRemoveTask={handleRemoveTask} handleToggleTask={handleToggleTask}/>
    </>
  )
}

export default App
