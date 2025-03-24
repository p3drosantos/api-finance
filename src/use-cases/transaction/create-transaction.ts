import { Transaction as PrismaTransaction } from "@prisma/client";

import {
  CreateTransactionParams,
  ICreateTransactionRepository,
  ICreateTransactionUseCase,
} from "../../controllers/transaction/create-transaction/protocols";
import { UserNotFoundError } from "../../errors/user";
import { GetUserByIdRepository } from "../../repositories/user/get-user-by-id";

export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor(
    private readonly transactionRepository: ICreateTransactionRepository,
    private readonly getUserByIdRepository: GetUserByIdRepository,
  ) {}

  async create(params: CreateTransactionParams): Promise<PrismaTransaction> {
    const userId = params.userId;

    const user = await this.getUserByIdRepository.getUserById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const transaction =
      await this.transactionRepository.createTransaction(params);

    return transaction;
  }
}
