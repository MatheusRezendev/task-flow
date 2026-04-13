import type { Task } from "@/types/task";
import { useMemo } from "react";

export function useTaskSearch(tasks: Task[], search: string) {
    return useMemo(() => {
        return tasks.filter((task) => {
            const searchTerm = search.toLowerCase();
            return (
                task.title.toLowerCase().includes(searchTerm) ||
                task.description.toLowerCase().includes(searchTerm)
            );
        })
    }, [tasks, search])
}