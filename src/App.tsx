// import { TaskForm } from "./components/TaskForm";
// import { TaskItem } from "./components/TaskItem";
import { TaskList } from "./components/TaskList";
import { TaskStats } from "./components/TaskStats";

import { MOCK_TASKS } from "./lib/mockTasks";

function App() {

  const total = MOCK_TASKS.length;
  const completed = MOCK_TASKS.filter(task => task.completed).length;
  const pending = total - completed;

  return (
    <>
      <TaskStats total={total} completed={completed} pending={pending}/>
      <TaskList tasks={MOCK_TASKS}/>
    </>
  )
}

export default App
