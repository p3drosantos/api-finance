import {
  CreateTransactionParams,
  ICreateTransactionRepository,
} from "../../controllers/transaction/create-transaction/protocols";
import prisma from "../../db/prisma";
import { Transaction as PrismaTransaction } from "@prisma/client";

export class CreateTransactionRepository
  implements ICreateTransactionRepository
{
  async create(params: CreateTransactionParams): Promise<PrismaTransaction> {
    const transaction = await prisma.transaction.create({
      data: {
        name: params.name,
        amount: params.amount,
        date: params.date,
        type: params.type,
        userId: params.userId,
      },
    });
    return transaction;
  }
}
