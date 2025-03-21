import { CreateUserController } from "../../controllers/user/create-user/create-user";
import { DeleteUserController } from "../../controllers/user/delete-user/delete-user";
import { GetUserByIdController } from "../../controllers/user/get-user-by-id/get-user-by-id";
import { GetUsersController } from "../../controllers/user/get-user/get-user";
import { UpdateUserController } from "../../controllers/user/update-user/update-user";
import { CreateUserRepository } from "../../repositories/user/create-user";
import { DeleteUserRepository } from "../../repositories/user/delete-user";
import { GetUserByEmailRepository } from "../../repositories/user/get-user-by-email";
import { GetUserByIdRepository } from "../../repositories/user/get-user-by-id";
import { GetUsersRepository } from "../../repositories/user/get-users";
import { UpdateUserRepository } from "../../repositories/user/update-user";
import { CreateUserUseCase } from "../../use-cases/users/create-user";
import { DeleteUserUseCase } from "../../use-cases/users/delete-user";
import { GetUserByIdUseCase } from "../../use-cases/users/get-user-by-id";
import { GetUsersUseCase } from "../../use-cases/users/get-users";
import { UpdateUserUseCase } from "../../use-cases/users/update-user";

export const makeGetUserByIdController = () => {
  const getUserByIdRepository = new GetUserByIdRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);
  return getUserByIdController;
};

export const makeGetUsersController = () => {
  const getUsersRepository = new GetUsersRepository();
  const getUsersUseCase = new GetUsersUseCase(getUsersRepository);
  const getUsersController = new GetUsersController(getUsersUseCase);
  return getUsersController;
};

export const makeCreateUserController = () => {
  const createUserRepository = new CreateUserRepository();
  const getUserByEmailRepository = new GetUserByEmailRepository();
  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    getUserByEmailRepository,
  );
  const createUserController = new CreateUserController(createUserUseCase);
  return createUserController;
};

export const makeUpdateUserController = () => {
  const updateUserRepository = new UpdateUserRepository();
  const updateUserUseCase = new UpdateUserUseCase(updateUserRepository);
  const updateUserController = new UpdateUserController(updateUserUseCase);
  return updateUserController;
};

export const makeDeleteUserController = () => {
  const deleteUserRepository = new DeleteUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);
  const deleteUserController = new DeleteUserController(deleteUserUseCase);
  return deleteUserController;
};
