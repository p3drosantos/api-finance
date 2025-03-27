import { Transaction } from "@prisma/client";
import {
  IDeleteTransactionUseCase,
  IDeleteTransactionRepository,
} from "../../controllers/transaction/delete-transaction/protocols";

export class DeleteTransactionUseCase implements IDeleteTransactionUseCase {
  constructor(
    private readonly deleteTransactionRepository: IDeleteTransactionRepository,
  ) {}

  async execute(transactionId: string): Promise<Transaction | null> {
    const transaction =
      await this.deleteTransactionRepository.delete(transactionId);
    return transaction;
  }
}
