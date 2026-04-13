import type { Task } from "@/types/task";
import type { TaskFilter } from "@/types/taskFilter";
import { useMemo } from "react";

export function useTaskFilter(tasks: Task[], filter: TaskFilter) {
    return useMemo(() => {
        return tasks.filter((task) => {
            if(filter === "all") return true;
            if(filter === "completed") return task.completed;
            if(filter === "pending") return !task.completed;

            return true;
        })
    }, [tasks, filter]) 
}