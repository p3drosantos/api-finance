import { UserNotFoundError } from "../../../errors/user";
import { badRequest, ok, serverError } from "../../helpers/http";
import { checkIfIdIsValid } from "../../helpers/validation";
import { IGetUserBalanceController, IGetUserBalanceUseCase } from "./protocols";

export class GetUserBalanceController implements IGetUserBalanceController {
  constructor(private readonly getUserBalanceUseCase: IGetUserBalanceUseCase) {}

  async handle(httpRequest: any) {
    try {
      const userId = httpRequest.params.userId;

      const idIsValid = checkIfIdIsValid(userId);

      if (!idIsValid) {
        return badRequest("Invalid user ID");
      }

      const userBalance = await this.getUserBalanceUseCase.execute(userId);

      return ok(userBalance as any);
    } catch (error) {
      if (error instanceof Error) {
        return badRequest("User not found");
      }
      console.error(error);
      return serverError("Internal server error");
    }
  }
}
