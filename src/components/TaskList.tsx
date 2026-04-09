import { 
    Card, 
    CardContent
} from "./ui/card"
import { Badge } from "./ui/badge"
import { MOCK_TASKS } from "@/lib/mockTasks"

const stylesheet = {
  section: "space-y-4",
  header: "flex items-end justify-between gap-4",
  headerText: "space-y-1 pt-4",
  headerActions: "flex items-center gap-2",
  title: "text-lg font-semibold",
  description: "text-sm text-muted-foreground",
  content: "space-y-3",
  counter: "",
  emptyCard: "gap-0",
  emptyContent: "py-8 text-center",
  emptyText: "text-sm text-muted-foreground",
  list: "space-y-3",
}


export function TaskList() {
    return <>
        <section className={stylesheet.section}>
            <div className={stylesheet.header}>
                <div className={stylesheet.headerText}>
                    <h2 className={stylesheet.title}>My Tasks</h2>
                    <p className={stylesheet.description}>Here are all your tasks.</p>
                </div>
                <Badge variant="outline" className={stylesheet.counter}>
                {MOCK_TASKS.length}
                </Badge>
            </div>

            <Card className={stylesheet.emptyCard}>
                <CardContent className={stylesheet.emptyContent}>
                <p className={stylesheet.emptyText}>
                    No tasks yet, create a new task to get started.
                </p>
                </CardContent>
            </Card>
        </section>
    </>
}
