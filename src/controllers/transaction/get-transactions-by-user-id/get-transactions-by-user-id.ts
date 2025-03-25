import { ok, serverError } from "../../helpers/http";
import { checkIfIdIsValid } from "../../helpers/validation";
import {
  IGetTransactionsByUserIdController,
  IGetTransactionsByUserIdUseCase,
} from "./protocols";

export class GetTransactionsByUserIdController
  implements IGetTransactionsByUserIdController
{
  constructor(
    private readonly getTransactionsByUserIdUseCase: IGetTransactionsByUserIdUseCase,
  ) {}

  async handle(request: any) {
    try {
      const userId = request.query.userId;

      if (!userId) {
        return {
          statusCode: 400,
          body: {
            error: "Missing user ID",
          },
        };
      }

      const userIdIsValid = checkIfIdIsValid(userId);

      if (!userIdIsValid) {
        return {
          statusCode: 400,
          body: {
            error: "Invalid user ID",
          },
        };
      }

      const transactions =
        await this.getTransactionsByUserIdUseCase.execute(userId);

      return ok(transactions);
    } catch (error) {
      console.error(error);
      return serverError("Internal server error");
    }
  }
}
