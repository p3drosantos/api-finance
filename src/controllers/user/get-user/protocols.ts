import { User } from "../../../models/user";
import { HttpResponse } from "../../protocols";
// import { HttpRequest, HttpResponse } from "../../protocols";

export interface IGetUserController {
  handle(): Promise<HttpResponse<User[]>>;
}

export interface IGetUsersRepository {
  getUsers(): Promise<User[]>;
}

export interface IGetUsersUseCase {
  execute(): Promise<User[]>;
}
