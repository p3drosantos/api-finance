import { IGetTransactionsByUserIdRepository } from "../../controllers/transaction/get-transactions-by-user-id/protocols";
import prisma from "../../db/prisma";
import { Transaction } from "@prisma/client";

export class GetTransactionsByUserIdRepository
  implements IGetTransactionsByUserIdRepository
{
  async getTransactionsByUserId(userId: string): Promise<Transaction[]> {
    return await prisma.transaction.findMany({
      where: {
        userId,
      },
    });
  }
}
