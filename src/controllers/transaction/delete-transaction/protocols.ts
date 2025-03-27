import { Transaction } from "@prisma/client";

export interface IDeleteTransactionRepository {
  delete(transactionId: string): Promise<Transaction | null>;
}

export interface IDeleteTransactionUseCase {
  execute(transactionId: string): Promise<Transaction | null>;
}
