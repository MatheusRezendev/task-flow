import { 
    Card, 
    CardContent, 
    CardFooter, CardHeader, 
    CardTitle 
} from "./ui/card";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const stylesheet = {
  card: "gap-0",
  header: "space-y-1",
  title: "text-base font-medium",
  description: "text-sm text-muted-foreground",
  content: "space-y-4 pt-4",
  field: "space-y-2",
  label: "text-sm font-medium",
  footer: "justify-end gap-2 bg-transparent border-t-0",
  form: "space-y-4",
}

export function TaskForm(){
    return <>
        <Card className={stylesheet.card}>
            <CardHeader className={stylesheet.header}>
                <CardTitle className={stylesheet.title}>New Task</CardTitle>
                <p>
                    Create a task and organize your workflow
                </p>
            </CardHeader>

            <Separator/>

            <CardContent className={stylesheet.content}>
                <form className={stylesheet.form}>
                    <div className={stylesheet.field}>
                        <label className={stylesheet.label}>Task name</label>
                        <Input placeholder="Ex: Study Zustand" />
                    </div>

                    <div className={stylesheet.field}>
                        <label className={stylesheet.label}>Description</label>
                        <Input placeholder="Describe the goal of this task" />
                    </div>
                </form>
            </CardContent>

            <CardFooter className={stylesheet.footer}>
                <Button>Add Task</Button>
            </CardFooter>
        </Card>
    </>
}