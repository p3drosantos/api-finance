import { Transaction } from "@prisma/client";
import { HttpRequest, HttpResponse } from "../../protocols";
import {
  CreateTransactionParams,
  ICreateTransactionController,
  ICreateTransactionUseCase,
} from "./protocols";
import { badRequest, ok, serverError } from "../../helpers/http";
import { createTransactionSchema } from "../../../schemas/transaction";
import { ZodError } from "zod";
import { TransactionType } from "../../../models/transaction";

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
      if (!httpRequest.body) {
        return badRequest("Request body is missing");
      }

      const params = httpRequest.body;

      await createTransactionSchema.parseAsync(params);

      const transaction = await this.createTransactionUseCase.create({
        userId: params.userId,
        name: params.name,
        date: params.date,
        type: params.type.toUpperCase() as TransactionType,
        amount: params.amount,
      });
      return ok(transaction);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(error.errors[0].message);
      }
      console.error(error);
      return serverError("Internal server error");
    }
  }
}
