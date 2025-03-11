import { User } from "../../../models/user";
import { badRequest, created } from "../../helpers";
import { HttpRequest, HttpResponse } from "../../protocols";
import {
  IUpdateUserController,
  IUpdateUserUseCase,
  UpdateUserParams,
} from "./protocols";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserUseCase: IUpdateUserUseCase) {}

  async handle(
    httpRequest: HttpRequest<UpdateUserParams>,
  ): Promise<HttpResponse<User>> {
    try {
      const { id } = httpRequest.params;
      const { body } = httpRequest ?? {};

      if (!id) {
        return badRequest("id is required");
      }

      if (!body) {
        return badRequest("body is required");
      }

      const user = await this.updateUserUseCase.execute(id, body);

      return created(user);
    } catch (error) {
      return badRequest("internal server error");
    }
  }
}
