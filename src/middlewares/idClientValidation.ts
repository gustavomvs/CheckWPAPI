import { Request, Response, NextFunction } from "express";
import { api } from "../database";

export const idClientValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientID: string = req.params.id;
  const client = api.find((client) => client.id === clientID);
  if (!client) {
    return res.status(404).json({ message: "Client not found." });
  }

  if (req.body.name === client.name) {
    return res.status(409).json({ message: "Client already registered." });
  }
  return next();
};
