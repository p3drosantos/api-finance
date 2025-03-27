import { Transaction } from "@prisma/client";

export interface IDeleteTransactionRepository {
  delete(transactionId: string): Promise<Transaction | null>;
}
