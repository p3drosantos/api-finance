import express from "express";
import dotenv from "dotenv";

import { CreateUserRepository } from "./src/repositories/user/create-user";
import { CreateUserController } from "./src/controllers/user/create-user/create-user";
import { CreateUserUseCase } from "./src/use-cases/users/create-user";
import { GetUsersRepository } from "./src/repositories/user/get-users";
import { GetUsersController } from "./src/controllers/user/get-user/get-user";
import { GetUsersUseCase } from "./src/use-cases/users/get-users";
import { GetUserByIdRepository } from "./src/repositories/user/get-user-by-id";
import { GetUserByIdUseCase } from "./src/use-cases/users/get-user-by-id";
import { GetUserByIdController } from "./src/controllers/user/get-user-by-id/get-user-by-id";
import { GetUserByEmailRepository } from "./src/repositories/user/get-user-by-email";
import { UpdateUserRepository } from "./src/repositories/user/update-user";
import { UpdateUserUseCase } from "./src/use-cases/users/update-user";
import { UpdateUserController } from "./src/controllers/user/update-user/update-user";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/api/users", async (req, res) => {
  const getUsersRepository = new GetUsersRepository();
  const getUsersUseCase = new GetUsersUseCase(getUsersRepository);

  const getUsersController = new GetUsersController(getUsersUseCase);

  const { body, statusCode } = await getUsersController.handle();

  res.status(statusCode).send(body);
});

app.get("/api/users/:id", async (req, res) => {
  const getUserByIdRepository = new GetUserByIdRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  const { body, statusCode } = await getUserByIdController.handle({
    body: req.params,
  });

  res.status(statusCode).send(body);
});

app.post("/api/users", async (req, res) => {
  const createUserRepository = new CreateUserRepository();
  const getUserByEmailRepository = new GetUserByEmailRepository();
  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    getUserByEmailRepository,
  );
  const createUserController = new CreateUserController(createUserUseCase);

  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

app.patch("/api/users/:id", async (req, res) => {
  const updateUserRepository = new UpdateUserRepository();
  const updateUserUseCase = new UpdateUserUseCase(updateUserRepository);
  const updateUserController = new UpdateUserController(updateUserUseCase);

  const { body, statusCode } = await updateUserController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

app.listen(process.env.port || 3000, () => {
  console.log(`Server is running on port ${process.env.port}`);
});
