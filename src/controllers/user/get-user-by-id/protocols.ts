import { User } from "../../../models/user";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface IGetUserByIdRepository {
  getUserById(id: string): Promise<User | null>;
}

export interface IGetUserByIdUseCase {
  execute(id: string): Promise<User | null>;
}

export interface IGetUserByIdController {
  handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<User | { error: string }>>;
}
