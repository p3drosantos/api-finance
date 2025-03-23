import { TransactionType } from "../../../models/transaction";
import { Transaction as PrismaTransaction } from "@prisma/client";

export interface CreateTransactionParams {
  userId: string;
  name: string;
  date: Date;
  amount: number;
  type: TransactionType;
}

export interface ICreateTransactionRepository {
  create(params: CreateTransactionParams): Promise<PrismaTransaction>;
}
