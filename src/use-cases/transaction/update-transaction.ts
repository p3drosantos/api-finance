import { Transaction } from "@prisma/client";
import {
  IUpdateTransactionRepository,
  IUpdateTransactionUseCase,
  UpdateTransactionParams,
} from "../../controllers/transaction/update-transaction/protocols";

export class UpadateTransactionUseCase implements IUpdateTransactionUseCase {
  constructor(
    private readonly updateTransactionRepository: IUpdateTransactionRepository,
  ) {}

  async execute(
    id: string,
    params: UpdateTransactionParams,
  ): Promise<Transaction> {
    const transaction = await this.updateTransactionRepository.update(
      id,
      params,
    );

    return transaction;
  }
}
