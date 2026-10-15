import type { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/app-error.js";

export const validateStatus = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const completed = req.body?.completed;

  if (typeof completed !== "boolean") {
    next(
      new AppError(
        "El campo completed debe ser true o false.",
        422,
        "VALIDATION_ERROR",
        {
          field: "completed",
        },
      ),
    );

    return;
  }

  res.locals.completed = completed;

  next();
};
