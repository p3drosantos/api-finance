import { Transaction as PrismaTransaction } from "@prisma/client";

export enum TransactionType {
  EARNING = "EARNING",
  EXPENSE = "EXPENSE",
  INVESTMENT = "INVESTMENT",
}

export interface Transaction extends Omit<PrismaTransaction, "amount"> {
  amount: number;
}
