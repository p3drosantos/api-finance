import { TransactionType } from "../../../models/transaction";
import { Transaction as PrismaTransaction } from "@prisma/client";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface CreateTransactionParams {
  userId: string;
  name: string;
  date: Date;
  amount: number;
  type: TransactionType;
}

export interface ICreateTransactionRepository {
  createTransaction(
    params: CreateTransactionParams,
  ): Promise<PrismaTransaction>;
}

export interface ICreateTransactionUseCase {
  create(params: CreateTransactionParams): Promise<PrismaTransaction>;
}

export interface ICreateTransactionController {
  handle(
    httpRequest: HttpRequest<CreateTransactionParams>,
  ): Promise<HttpResponse<PrismaTransaction | { error: string }>>;
}
