// import { TaskForm } from "./components/TaskForm";
import { TaskItem } from "./components/TaskItem";
import { TaskList } from "./components/TaskList";

function App() {

  return (
    <>
      <TaskList></TaskList>
      <TaskItem task={{ id: "1", title: "Sample Task", description: "This is a sample task.", completed: false, createdAt: new Date() }}></TaskItem>
    </>
  )
}

export default App
