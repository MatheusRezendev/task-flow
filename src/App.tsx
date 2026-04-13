import { TaskList } from "./components/TaskList";
import { TaskStats } from "./components/TaskStats";

import { TaskViewProvider } from "./components/TaskViewProvider";

function App() {  
  return (
    <>
      <TaskStats/>
      <TaskViewProvider>
        <TaskList/>
      </TaskViewProvider>
    </>
  )
}

export default App
