import { Transaction } from "@prisma/client";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface IDeleteTransactionRepository {
  delete(transactionId: string): Promise<Transaction | null>;
}

export interface IDeleteTransactionUseCase {
  execute(transactionId: string): Promise<Transaction | null>;
}

export interface IDeleteTransactionController {
  handle(
    request: HttpRequest<any>,
  ): Promise<HttpResponse<Transaction | { error: string }>>;
}
