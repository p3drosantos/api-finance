import { Transaction } from "@prisma/client";
import { HttpRequest, HttpResponse } from "../../protocols";
import {
  CreateTransactionParams,
  ICreateTransactionController,
  ICreateTransactionUseCase,
} from "./protocols";
import { badRequest, serverError } from "../../helpers/http";
import { checkIfIdIsValid } from "../../helpers/validation";
import { TransactionType } from "../../../models/transaction";
var validator = require("validator");

export class CreateTransactionController
  implements ICreateTransactionController
{
  constructor(
    private readonly createTransactionUseCase: ICreateTransactionUseCase,
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateTransactionParams>,
  ): Promise<HttpResponse<Transaction | { error: string }>> {
    try {
      const params = httpRequest.body;

      if (!params) {
        return badRequest("Missing request body");
      }

      const requiredFields: (keyof CreateTransactionParams)[] = [
        "name",
        "userId",
        "amount",
        "date",
        "type",
      ];

      for (const field of requiredFields) {
        const value = params[field];

        if (value === undefined || value === null) {
          return badRequest(`Missing param: ${field}`);
        }

        // Validação correta dos tipos
        if (
          (typeof value === "string" && !value.trim()) || // Strings não podem ser vazias
          (field === "amount" && typeof value !== "number")
        ) {
          return badRequest(`Invalid or missing param: ${field}`);
        }
      }

      const userIdIsValid = checkIfIdIsValid(params.userId);
      if (!userIdIsValid) {
        return badRequest("Invalid user id");
      }

      if (params.amount <= 0) {
        return badRequest("Amount must be greater than 0");
      }

      const amountIsValid = validator.isCurrency(params.amount.toString(), {
        allow_negatives: false,
        require_decimal: false,
        digits_after_decimal: [2],
      });

      if (!amountIsValid) {
        return badRequest("Invalid amount");
      }

      const type = params.type.trim().toUpperCase();

      const typeIsValid = ["EARNING", "EXPENSE", "INVESTMENT"].includes(type);

      if (!typeIsValid) {
        return badRequest("Invalid transaction type");
      }

      // Criar transação
      const transaction = await this.createTransactionUseCase.create({
        ...params,
        type: type as TransactionType,
      });
      return {
        statusCode: 201,
        body: transaction,
      };
    } catch (error) {
      console.error(error);
      return serverError("Internal server error");
    }
  }
}
