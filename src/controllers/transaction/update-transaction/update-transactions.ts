import { Transaction } from "@prisma/client";
import { HttpRequest, HttpResponse } from "../../protocols";
import {
  IUpdateTransactionController,
  IUpdateTransactionUseCase,
  UpdateTransactionParams,
} from "./protocols";
import { badRequest, ok } from "../../helpers/http";
import { checkIfIdIsValid } from "../../helpers/validation";

import { checkIfAmountIsValid } from "../../helpers/transaction";

var validator = require("validator");

export class UpdateTransactionController
  implements IUpdateTransactionController
{
  constructor(
    private readonly updateTransactionUseCase: IUpdateTransactionUseCase,
  ) {}

  async handle(
    httpRequest: HttpRequest<UpdateTransactionParams>,
  ): Promise<HttpResponse<Transaction | Error>> {
    try {
      const idIsValid = checkIfIdIsValid(httpRequest.params.id);
      if (!idIsValid) {
        return badRequest("ID is invalid");
      }

      const params = httpRequest.body;
      if (!params) {
        return badRequest("Body is required");
      }

      if (params.amount !== undefined) {
        if (!checkIfAmountIsValid(params.amount)) {
          return badRequest("Amount is invalid");
        }
      }

      if (params.type !== undefined) {
        const validTypes = ["EXPENSE", "INVESTMENT", "EARNING"];
        if (!validTypes.includes(params.type)) {
          return badRequest(`Type must be one of: ${validTypes.join(", ")}`);
        }
      }

      const allowedFields = ["name", "date", "amount", "type"];
      const someFieldIsNotAllowed = Object.keys(params).some(
        (field) => !allowedFields.includes(field),
      );

      if (someFieldIsNotAllowed) {
        return badRequest("Some field is not allowed");
      }

      const transaction = await this.updateTransactionUseCase.execute(
        httpRequest.params.id,
        params,
      );

      return ok(transaction);
    } catch (error) {
      console.error(error);
      return badRequest("Internal server error");
    }
  }
}
