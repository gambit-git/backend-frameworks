import type { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/app-error.js";

export const validateTitle = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const title = req.body?.title;

  if (typeof title !== "string" || !title.trim()) {
    next(
      new AppError("El campo title es obligatorio.", 422, "VALIDATION_ERROR", {
        field: "title",
      }),
    );

    return;
  }

  res.locals.title = title.trim();

  next();
};
