import { Request, Response, NextFunction } from "express";
import { api } from "../database";

export const createClientValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const missingFields: string[] = [];

  !req.body.name && missingFields.push("name");

  if (missingFields.length > 0) {
    const errorMessage: string = `! ERROR ! Missing body parameter(s): ${missingFields.join(
      ", "
    )}`;
    return res.status(400).json({ message: errorMessage });
  }

  const clientName: string = req.body.name;
  const clientExists: boolean = api.some(
    (product) => product.name === clientName
  );
  if (clientExists) {
    return res.status(409).json({ message: "Client already registered." });
  }

  return next();
};
