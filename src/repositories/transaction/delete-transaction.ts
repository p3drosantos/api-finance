import { Transaction } from "@prisma/client";
import { IDeleteTransactionRepository } from "../../controllers/transaction/delete-transaction/protocols";
import prisma from "../../db/prisma";

export class DeleteTransactionRepository
  implements IDeleteTransactionRepository
{
  async delete(transactionId: string): Promise<Transaction | null> {
    const transaction = await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });
    return transaction;
  }
}
