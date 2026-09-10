import {
  createTask,
  completeTask,
  deleteTask,
  listTasks,
  listPendingTasks,
} from "./services/task.services.js";
import { delay } from "./utils/delay.js";
import { getAppName } from "./utils/env.js";

const showTasks = (taskList = listTasks()): void => {
  const rows = taskList.map((task) => ({
    id: task.id,
    title: task.title,
    status: task.status,
    createdAt: task.createdAt.toLocaleString(),
  }));
  console.table(rows);
};

const main = async (): Promise<void> => {
  console.log(`\n${getAppName()}`);
  console.log("Iniciando aplicación...");
  await delay(300);

  console.log("\nTareas iniciales:");
  showTasks();

  // Crear tarea
  const newTask = createTask("Construir mi primer servicio");
  console.log(`\nTarea creada exitosamente con ID: ${newTask.id}`);

  // Completar tarea
  completeTask(newTask.id);
  console.log(`Tarea ${newTask.id} marcada como completada.`);

  console.log("\nTareas pendientes actuales:");
  showTasks(listPendingTasks());

  // Probar eliminación exitosa del desafío
  console.log("\n--- Probando eliminación de tarea ---");
  const removedTask = deleteTask(1);
  console.log(
    `Tarea eliminada correctamente: "${removedTask.title}" (ID: ${removedTask.id})`,
  );

  console.log("\nEstado final de las tareas:");
  showTasks();

  // Prueba de manejo de errores
  console.log("\n--- Probando captura de errores ---");

  // Error al intentar completar ID inexistente
  try {
    completeTask(999);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Ocurrió un error desconocido.";
    console.error(`Error controlado (Completar): ${message}`);
  }

  // Error al intentar eliminar ID inexistente (Desafío)
  try {
    deleteTask(999);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Ocurrió un error desconocido.";
    console.error(`Error controlado (Eliminar): ${message}`);
  }
};

main().catch((error: unknown) => {
  console.error("Error no controlado:", error);
  process.exitCode = 1;
});
