import type { Task } from "@/types/task"

import { Card, 
    CardContent, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "./ui/card"
import { Separator } from "./ui/separator"
import { Badge } from "./ui/badge"
import { Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import { useTaskStore } from "@/store/taskStore"

type TaskItemProps = {
    task: Task
}

const stylesheet = {
  card: "gap-0 overflow-hidden relative ",
  header: "space-y-1 pb-3",
  title: "text-base font-semibold tracking-tight",
  content: "space-y-2 pt-4 pb-4",
  description: "text-sm leading-6 text-muted-foreground",
  footer: "justify-between gap-3 border-t border-border/60 bg-muted/30 px-4 py-3",
  metaGroup: "flex items-center gap-2",
  statusPending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  statusCompleted: "bg-green-100 text-green-800 hover:bg-green-100",
  dateBadge: "rounded-full border-border/70 bg-background/60 px-3 py-1 text-xs text-muted-foreground",
  trashButton: "absolute right-2 top-4 inline-flex h-6 w-8 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-500/10 hover:text-red-600",

}

export function TaskItem({ task }: TaskItemProps) {
    const removeTask = useTaskStore((state) => state.removeTask);
    const handleToggleTask = useTaskStore((state) => state.toggleTask);

    return<>
        <Card className={stylesheet.card}>
            <CardHeader className={stylesheet.header}>
                <CardTitle className={stylesheet.title}>{task.title}</CardTitle>
                <Trash2 onClick={() => removeTask(task.id)} className={stylesheet.trashButton} />
            </CardHeader>

            <Separator/>

            <CardContent className={stylesheet.content}>
                <p className={stylesheet.description}>{task.description}</p>
            </CardContent>

            <CardFooter className={stylesheet.footer}>
                <Button className={task.completed ? stylesheet.statusCompleted : stylesheet.statusPending} onClick={() => handleToggleTask(task.id)}>
                    {task.completed ? "Completed" : "Pending"}
                </Button>
                <Badge className={stylesheet.dateBadge}>
                    {new Date(task.createdAt).toLocaleDateString()}
                </Badge>
            </CardFooter>
        </Card>
    </>
}
