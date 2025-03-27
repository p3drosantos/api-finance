import { Transaction } from "@prisma/client";
import { HttpRequest, HttpResponse } from "../../protocols";
import {
  IDeleteTransactionController,
  IDeleteTransactionUseCase,
} from "./protocols";
import { badRequest, ok, serverError } from "../../helpers/http";
import { checkIfIdIsValid } from "../../helpers/validation";

export class DeleteTransactionController
  implements IDeleteTransactionController
{
  constructor(
    private readonly deleteTransactionUseCase: IDeleteTransactionUseCase,
  ) {}

  async handle(
    httpRequest: HttpRequest<{ transactionId: string }>,
  ): Promise<HttpResponse<Transaction | { error: string }>> {
    try {
      if (!httpRequest.body?.transactionId) {
        return badRequest("Missing transaction ID");
      }

      const transaction = await this.deleteTransactionUseCase.execute(
        httpRequest.body.transactionId,
      );

      const isValidID = checkIfIdIsValid(httpRequest.body.transactionId);

      if (!isValidID) {
        return badRequest("ID is invalid");
      }

      if (!transaction) {
        return badRequest("Transaction not found");
      }

      return ok(transaction);
    } catch (error) {
      console.log(error);
      return serverError("Internal server error");
    }
  }
}
