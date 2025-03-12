import { User } from "../../../models/user";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface IDeleteUserRepository {
  delete(id: string): Promise<User | null>;
}

export interface IDeleteUserUseCase {
  execute(id: string): Promise<User | null>;
}

export interface IDeleteUserController {
  handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<User | { error: string }>>;
}
