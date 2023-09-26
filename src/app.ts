import express from "express";
import {
  createClient,
  deleteClient,
  readOneClient,
  readClient,
  updateClient,
} from "./logic";
import { createClientValidation } from "./middlewares/createClientValidation";
import { idClientValidation } from "./middlewares/idClientValidation";

const app = express();

app.use(express.json());

app.post("/clients", createClientValidation, createClient);

app.get("/clients", readClient);

app.get("/clients/:id", idClientValidation, readOneClient);

app.patch("/clients/:id", idClientValidation, updateClient);

app.delete("/clients/:id", idClientValidation, deleteClient);

app.listen(3000, () => {
  console.log("Api Ligada com Sucesso!");
});
