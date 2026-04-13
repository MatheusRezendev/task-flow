import { useEffect, useState } from "react";
import { TaskList } from "./components/TaskList";
import { TaskStats } from "./components/TaskStats";

import type { Task } from "./types/task";
import { TaskViewProvider } from "./components/TaskViewProvider";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("task-flow:tasks");

    if(!storedTasks) return [];

    const parsedTasks = JSON.parse(storedTasks).map((task: Task) => ({
      ...task,
      createdAt: new Date(task.createdAt),
    }));

    return parsedTasks;
  });

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

  useEffect(() => {
    localStorage.setItem("task-flow:tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <TaskStats total={total} completed={completed} pending={pending}/>
      <TaskViewProvider>
        <TaskList tasks={tasks} onAddTask={handleAddTask} onRemoveTask={handleRemoveTask} handleToggleTask={handleToggleTask}/>
      </TaskViewProvider>
    </>
  )
}

export default App
