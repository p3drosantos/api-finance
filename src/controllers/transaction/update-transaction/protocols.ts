import { Transaction } from "@prisma/client";
import { TransactionType } from "../../../models/transaction";

export interface UpdateTransactionParams {
  name: string;
  date: Date;
  amount: number;
  type: TransactionType;
}

export interface IUpdateTransactionRepository {
  update: (id: string, params: UpdateTransactionParams) => Promise<Transaction>;
}

export interface IUpdateTransactionUseCase {
  execute: (
    id: string,
    params: UpdateTransactionParams,
  ) => Promise<Transaction>;
}
