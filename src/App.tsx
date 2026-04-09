// import { TaskForm } from "./components/TaskForm";
// import { TaskItem } from "./components/TaskItem";
import { TaskList } from "./components/TaskList";
import { TaskStats } from "./components/TaskStats";

function App() {

  return (
    <>
      <TaskStats total={11} completed={5} pending={5}></TaskStats>
      <TaskList></TaskList>
    </>
  )
}

export default App
