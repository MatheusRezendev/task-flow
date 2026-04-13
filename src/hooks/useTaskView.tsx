import { TaskViewContext } from "@/context/taskViewContext";
import { useContext } from "react";

export function useTaskView() {
    const context = useContext(TaskViewContext);

    if (!context) {
        throw new Error("useTaskView must be used within a TaskViewProvider");
    }

    return context;
}