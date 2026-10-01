export type TaskStatus = "pending" | "completed";
//propiedades y tipo de datos de la tarea
export interface Task {
  id: number;
  title: string;
  status?: TaskStatus;
  createdAt: Date;
}
