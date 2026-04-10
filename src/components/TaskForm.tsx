import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "./ui/card";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

import { useState, type SubmitEvent } from "react";

type TaskFormProps = {
    onAddTask: (title:string, description:string) => void
    setIsCreateTaskOpen: (open:boolean) => void
}

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
  button: "gap-2",
}

export function TaskForm({ onAddTask, setIsCreateTaskOpen }: TaskFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) =>{
        event.preventDefault();
        onAddTask(title, description);
        setTitle("");
        setDescription("");
        setIsCreateTaskOpen(false);
    }

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
                <form onSubmit={handleSubmit} className={stylesheet.form}>
                    <div className={stylesheet.field}>
                        <label className={stylesheet.label}>Task name</label>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Study Zustand" />
                    </div>
                    <div className={stylesheet.field}>
                        <label className={stylesheet.label}>Description</label>
                        <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the goal of this task" />
                    </div>
                        <Button type="submit" className={stylesheet.button}>Add Task</Button>
                </form>
            </CardContent>
        </Card>
    </>
}