import type { Task } from "../models/task.js";

// Array que almacena todas las tareas
export const tasks: Task[] = [
  {
    id: 1,
    title: "Configurar el proyecto backend",
    status: "completed",
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Practicar TypeScript",

    createdAt: new Date(),
  },
  {
    id: 3,
    title: "Aprender Node.js",
    status: "pending",
    createdAt: new Date(),
  },
];
