import type { Task } from "@/types/task"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"
import { Badge } from "./ui/badge"

type TaskItemProps = {
    task: Task
}

const stylesheet = {
  card: "gap-0 overflow-hidden",
  header: "space-y-1 pb-3",
  title: "text-base font-semibold tracking-tight",
  content: "space-y-2 pt-4 pb-4",
  description: "text-sm leading-6 text-muted-foreground",
  footer: "justify-between gap-3 border-t border-border/60 bg-muted/30 px-4 py-3",
  metaGroup: "flex items-center gap-2",
  statusBadge:
    "rounded-full px-3 py-1 text-xs font-medium",
  dateBadge:
    "rounded-full border-border/70 bg-background/60 px-3 py-1 text-xs text-muted-foreground",
}

export function TaskItem({ task }: TaskItemProps) {
    return<>
        <Card className={stylesheet.card}>
            <CardHeader className={stylesheet.header}>
                <CardTitle className={stylesheet.title}>{task.title}</CardTitle>
            </CardHeader>

            <Separator/>

            <CardContent className={stylesheet.content}>
                <p className={stylesheet.description}>{task.description}</p>
            </CardContent>

            <CardFooter className={stylesheet.footer}>
                <Badge className={stylesheet.statusBadge}>
                    {task.completed ? "Completed" : "Pending"}
                </Badge>
                <Badge className={stylesheet.dateBadge}>
                    {task.createdAt.toLocaleDateString()}
                </Badge>
            </CardFooter>
        </Card>
    </>
}