import { Transaction } from "@prisma/client";
import {
  IUpdateTransactionRepository,
  UpdateTransactionParams,
} from "../../controllers/transaction/update-transaction/protocols";
import prisma from "../../db/prisma";

export class UpdateTransactionRepository
  implements IUpdateTransactionRepository
{
  async update(
    id: string,
    params: UpdateTransactionParams,
  ): Promise<Transaction> {
    const transaction = await prisma.transaction.update({
      where: { id },
      data: params,
    });

    return transaction;
  }
}
