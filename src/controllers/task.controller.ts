import type { NextFunction, Request, Response } from "express";

import {
  completeTask,
  createTask,
  deleteTask,
  updateTaskStatus,
  findTaskById,
  listTasks,
  updateTaskTitle,
} from "../services/task.service.js";

export const getTasks = (_req: Request, res: Response): void => {
  res.status(200).json({
    data: listTasks(),
  });
};

export const getTask = (
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const id = res.locals.taskId as number;
    const task = findTaskById(id);

    res.status(200).json({
      data: task,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const postTask = (
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const title = res.locals.title as string;
    const task = createTask(title);

    res.status(201).json({
      data: task,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const patchTaskComplete = (
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const id = res.locals.taskId as number;
    const task = completeTask(id);

    res.status(200).json({
      data: task,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const patchTaskTitle = (
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const id = res.locals.taskId as number;
    const title = res.locals.title as string;

    const task = updateTaskTitle(id, title);

    res.status(200).json({
      data: task,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const removeTask = (
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const id = res.locals.taskId as number;

    deleteTask(id);

    res.status(204).send();
  } catch (error: unknown) {
    next(error);
  }
};
export const patchTaskStatus = (
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const id = res.locals.taskId as number;
    const completed = res.locals.completed as boolean;

    const task = updateTaskStatus(id, completed);

    res.status(200).json({
      data: task,
    });
  } catch (error: unknown) {
    next(error);
  }
};
