import express from "express";
import dotenv from "dotenv";

import {
  makeCreateUserController,
  makeDeleteUserController,
  makeGetUserByIdController,
  makeGetUsersController,
  makeUpdateUserController,
} from "./src/factories/controllers/user";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/api/users", async (req, res) => {
  const getUsersController = makeGetUsersController();

  const { body, statusCode } = await getUsersController.handle();

  res.status(statusCode).send(body);
});

app.get("/api/users/:id", async (req, res) => {
  const getUserByIdController = makeGetUserByIdController();

  const { body, statusCode } = await getUserByIdController.handle({
    body: req.params,
  });

  res.status(statusCode).send(body);
});

app.post("/api/users", async (req, res) => {
  const createUserController = makeCreateUserController();

  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

app.patch("/api/users/:id", async (req, res) => {
  const updateUserController = makeUpdateUserController();

  const { body, statusCode } = await updateUserController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

app.delete("/api/users/:id", async (req, res) => {
  const deleteUserController = makeDeleteUserController();

  const { body, statusCode } = await deleteUserController.handle({
    body: req.params,
  });

  res.status(statusCode).send(body);
});

app.listen(process.env.port || 3000, () => {
  console.log(`Server is running on port ${process.env.port}`);
});
