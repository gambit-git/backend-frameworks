import type { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/app-error.js";

export const validateId = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const value = req.params.id;

  if (typeof value !== "string") {
    next(new AppError("El id debe ser un entero positivo.", 400, "INVALID_ID"));
    return;
  }

  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    next(new AppError("El id debe ser un entero positivo.", 400, "INVALID_ID"));
    return;
  }

  res.locals.taskId = id;

  next();
};
