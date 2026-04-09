import { 
    Card, 
    CardContent
} from "./ui/card"
import { Badge } from "./ui/badge"

const stylesheet = {
  section: "space-y-4",
  headerRow: "flex items-end justify-between",
  headerText: "space-y-1",
  title: "text-lg font-semibold",
  description: "text-sm text-muted-foreground",
  counter: "",
  card: "gap-0",
  emptyContent: "py-8 text-center",
  emptyText: "text-sm text-muted-foreground",
}


export function TaskList() {
    return <>
        <section className={stylesheet.section}>
            <div className={stylesheet.headerRow}>
                <div className={stylesheet.headerText}>
                    <h2 className={stylesheet.title}>My Tasks</h2>
                    <p className={stylesheet.description}>Here are all your tasks.</p>
                </div>

                <Badge variant="outline" className={stylesheet.counter}>
                0 tasks
                </Badge>
            </div>

            <Card className={stylesheet.card}>
                <CardContent className={stylesheet.emptyContent}>
                <p className={stylesheet.emptyText}>
                    No tasks yet, create a new task to get started.
                </p>
                </CardContent>
            </Card>
        </section>
    </>
}
