import { Request, Response } from "express";
import { api } from "./database";
import { Clients } from "./interfaces";
import { v4 as uuid } from "uuid";

let id = uuid();

export const createClient = (req: Request, res: Response) => {
  const registerDate: Date = new Date();

  registerDate.setFullYear(registerDate.getFullYear());
  const newClient = { id, ...req.body, registerDate };

  api.push(newClient);
  return res.status(201).json(newClient);
};

export const readClient = (req: Request, res: Response) => {
  return res.status(200).json(api);
};

export const readOneClient = (req: Request, res: Response) => {
  const clientID = req.params.id;
  const client = api.find((client) => client.id === clientID);

  return res.status(200).json(client);
};

export const updateClient = (req: Request, res: Response) => {
  const clientID = req.params.id;
  const index = api.findIndex((client) => client.id === clientID);
  const existingClient = api[index];

  const newClient = Object.assign(existingClient, req.body);
  api[index] = newClient;

  return res.status(200).json(newClient);
};

export const deleteClient = (req: Request, res: Response) => {
  const clientID = req.params.id;

  const index = api.findIndex((client) => client.id === clientID);
  const client = api.find((client) => client.id === clientID);
  if (index !== -1) {
    api.splice(index, 1);
  }

  return res.status(200).json({ message: "Client deleted", api });
};
