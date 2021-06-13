import { Request, Response, NextFunction } from 'express';

export type HTTPFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;
