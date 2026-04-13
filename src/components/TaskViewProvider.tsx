import { TaskViewContext } from "@/context/taskViewContext";
import type { TaskFilter } from "@/types/taskFilter";
import { useState } from "react";

export function TaskViewProvider({ children }: { children: React.ReactNode }) {
    const [filter, setFilter] = useState<TaskFilter>("all");
    const [search, setSearch] = useState("");

    return (
        <TaskViewContext value={{ filter, setFilter, search, setSearch }}>
            {children}
        </TaskViewContext>
    );
}