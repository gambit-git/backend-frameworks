import type { Request, Response } from "express";

export const notFound = (req: Request, res: Response): void => {
  const requestId = res.locals.requestId as string;

  res.status(404).json({
    code: "ROUTE_NOT_FOUND",
    message: `No existe ${req.method} ${req.originalUrl}.`,
    requestId,
  });
};
