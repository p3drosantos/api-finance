import { User } from "../../../models/user";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface ICreateUserController {
  handle(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<User | { error: string }>>;
}

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}

export interface ICreateUserUseCase {
  execute(params: CreateUserParams): Promise<User>;
}
