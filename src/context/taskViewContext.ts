import { createContext } from "react";

import type { TaskFilter } from "@/types/taskFilter";

export type TaskViewContextValue = {
  filter: TaskFilter;
  setFilter: (filter: TaskFilter) => void;
  search: string;
  setSearch: (value: string) => void;
}

export const TaskViewContext = createContext<TaskViewContextValue | null>(null);



