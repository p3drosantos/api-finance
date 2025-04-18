import { User } from "../../../models/user";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface UpdateUserParams {
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}

export interface IUpdateUserUseCase {
  execute(id: string, params: UpdateUserParams): Promise<User>;
}

export interface IUpdateUserController {
  handle(
    httpRequest: HttpRequest<UpdateUserParams>,
  ): Promise<HttpResponse<User>>;
}
