import { 
    Card, 
    CardContent
} from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"

import type { Task } from "@/types/task"

import { TaskItem } from "./TaskItem"
import { TaskForm } from "./TaskForm"

import { useState } from "react"

type TaskListProps = {
  tasks: Task[]
  onAddTask: (title:string, description:string) => void
}

const stylesheet = {
  section: "space-y-4",
  header: "flex items-end justify-between gap-4",
  headerText: "space-y-1 pt-4",
  headerActions: "flex flex-col items-end gap-2 pt-4",
  title: "text-lg font-semibold",
  description: "text-sm text-muted-foreground",
  content: "space-y-3",
  counter: "bg-background text-foreground rounded-full px-2 py-1 text-xs font-medium",
  emptyCard: "gap-0",
  emptyContent: "py-8 text-center",
  emptyText: "text-sm text-muted-foreground",
  list: "space-y-3",
  button: "inline-flex items-center gap-2",
}


export function TaskList({ tasks, onAddTask}: TaskListProps) {
    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

    return <>
        <section className={stylesheet.section}>
            <div className={stylesheet.header}>
                <div className={stylesheet.headerText}>
                    <h2 className={stylesheet.title}>My Tasks</h2>
                    <p className={stylesheet.description}>Here are all your tasks.</p>
                </div>
                <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
                    <DialogTrigger asChild>  
                        <Button className={stylesheet.button} >
                            New Task
                            <Badge variant="outline" className={stylesheet.counter}>
                                {tasks.length}
                            </Badge>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>
                            <TaskForm onAddTask={onAddTask} setIsCreateTaskOpen={setIsCreateTaskOpen}/>
                        </DialogTitle>
                    </DialogContent>
                </Dialog>
            </div>
            <Card className={stylesheet.emptyCard}>
                <CardContent className={stylesheet.emptyContent}>
                    {tasks.length === 0 ?(
                        <p className={stylesheet.emptyText}>You don't have any tasks yet.</p>
                    ):( 
                        <ul className={stylesheet.list}>   
                        {tasks.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                        </ul>
                    )}
                </CardContent>
            </Card>
        </section>
    </>
}
