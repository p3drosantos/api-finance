import { User } from "../../../models/user";
import { HttpRequest, HttpResponse } from "../../protocols";
import { ok, serverError, badRequest } from "../../helpers/http";
import { IDeleteUserController, IDeleteUserUseCase } from "./protocols";
import { checkIfIdIsValid } from "../../helpers/validation";

export class DeleteUserController implements IDeleteUserController {
  constructor(private readonly deleteUserUseCase: IDeleteUserUseCase) {}

  async handle(
    httpRequest: HttpRequest<{ id: string }>,
  ): Promise<HttpResponse<User | { error: string }>> {
    try {
      if (!httpRequest.body?.id) {
        return badRequest("Missing user ID");
      }

      const user = await this.deleteUserUseCase.execute(httpRequest.body.id);

      const isValidID = checkIfIdIsValid(httpRequest.body.id);

      if (!isValidID) {
        return badRequest("ID is invalid");
      }

      if (!user) {
        return badRequest("User not found");
      }

      return ok(user); // Retorna o usuário deletado
    } catch (error) {
      console.error(error);
      return serverError("Internal server error");
    }
  }
}
