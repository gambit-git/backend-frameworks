import { Router } from "express";

import {
  getTask,
  getTasks,
  patchTaskComplete,
  patchTaskStatus,
  patchTaskTitle,
  postTask,
  removeTask,
} from "../controllers/task.controller.js";

import { requireJson } from "../middlewares/require-json.middleware.js";
import { validateId } from "../middlewares/validate-id.middleware.js";
import { validateCompleted } from "../middlewares/validate-completed.middleware.js";
import { validateTitle } from "../middlewares/validate-title.middleware.js";

export const taskRouter = Router();

taskRouter.get("/", getTasks);

taskRouter.post("/", requireJson, validateTitle, postTask);

taskRouter.get("/:id", validateId, getTask);

taskRouter.patch(
  "/:id",
  validateId,
  requireJson,
  validateTitle,
  patchTaskTitle,
);

taskRouter.patch("/:id/complete", validateId, patchTaskComplete);
taskRouter.patch(
  "/:id/status",
  validateId,
  requireJson,
  validateCompleted,
  patchTaskStatus,
);

taskRouter.delete("/:id", validateId, removeTask);
