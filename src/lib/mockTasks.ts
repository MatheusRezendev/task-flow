import type { Task } from "@/types/task";

export const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Study Zustand",
    description: "Understand global state and store structure.",
    completed: false,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Build Task UI",
    description: "Create the visual structure of the app.",
    completed: true,
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Implement Task Logic",
    description: "Add functionality to manage tasks.",
    completed: false,
    createdAt: new Date(),
  },
]