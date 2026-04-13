import type { Task } from "@/types/task";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type TaskStore = {
    tasks: Task[];
    addTask: (title: string, description: string) => void;
    removeTask: (taskId: string) => void;
    toggleTask: (taskId: string) => void;
};

export const useTaskStore = create<TaskStore>()(
  devtools(
    persist(
      (set) => ({
        tasks: [],

        addTask: (title, description) => {
          const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            description,
            completed: false,
            createdAt: new Date().toISOString(),
          }

          set((state) => ({
            tasks: [...state.tasks, newTask],
          }))
        },

        removeTask: (taskId) =>
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId),
          })),

        toggleTask: (taskId) =>
          set((state) => ({
            tasks: state.tasks.map((task) => {
              if (task.id === taskId) {
                return { ...task, completed: !task.completed }
              }

              return task
            }),
          })),
      }),
      {
        name: "task-flow:tasks",
      }
    )
  )
)