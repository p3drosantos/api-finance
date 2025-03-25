import { Transaction } from "@prisma/client";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface IGetTransactionsByUserIdRepository {
  getTransactionsByUserId: (userId: string) => Promise<Transaction[]>;
}

export interface IGetTransactionsByUserIdUseCase {
  execute: (userId: string) => Promise<Transaction[]>;
}

export interface IGetTransactionsByUserIdController {
  handle: (
    HttpRequest: HttpRequest<any>,
  ) => Promise<HttpResponse<Transaction[] | { error: string }>>;
}
