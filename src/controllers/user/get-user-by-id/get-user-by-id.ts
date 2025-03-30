import { notFound, ok, serverError } from "../../helpers/http";
import { checkIfIdIsValid } from "../../helpers/validation";
import { HttpRequest } from "../../protocols";
import { IGetUserByIdController, IGetUserByIdUseCase } from "./protocols";

export class GetUserByIdController implements IGetUserByIdController {
  constructor(private readonly getUserByIdUseCase: IGetUserByIdUseCase) {}

  async handle(httpRequest: HttpRequest<any>) {
    try {
      const { id } = httpRequest.body;
      const user = await this.getUserByIdUseCase.execute(id);

      const isValidID = checkIfIdIsValid(id);

      if (!isValidID) {
        return notFound("ID is invalid");
      }

      if (!user) {
        return notFound("User not found");
      }

      return ok(user);
    } catch (error) {
      console.error(error);
      return serverError("Internal server error");
    }
  }
}
