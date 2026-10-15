import type { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/app-error.js";

type JsonParseError = SyntaxError & {
  status?: number;
  type?: string;
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const requestId = res.locals.requestId as string;

  if (
    error instanceof SyntaxError &&
    (error as JsonParseError).status === 400 &&
    (error as JsonParseError).type === "entity.parse.failed"
  ) {
    res.status(400).json({
      code: "INVALID_JSON",
      message: "El cuerpo JSON no es válido.",
      requestId,
    });

    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      code: error.code,
      message: error.message,
      ...(error.details !== undefined ? { details: error.details } : {}),
      requestId,
    });

    return;
  }

  console.error(error);

  res.status(500).json({
    code: "INTERNAL_ERROR",
    message: "Error interno del servidor.",
    requestId,
  });
};
