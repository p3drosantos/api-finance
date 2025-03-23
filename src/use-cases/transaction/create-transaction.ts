import { Transaction as PrismaTransaction } from "@prisma/client";

import {
  CreateTransactionParams,
  ICreateTransactionRepository,
  ICreateTransactionUseCase,
} from "../../controllers/transaction/create-transaction/protocols";
import { GetUserByEmailRepository } from "../../repositories/user/get-user-by-email";
import { UserNotFoundError } from "../../errors/user";

export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor(
    private readonly transactionRepository: ICreateTransactionRepository,
    private readonly getUserByIdRepository: GetUserByEmailRepository,
  ) {}

  async create(params: CreateTransactionParams): Promise<PrismaTransaction> {
    const userId = params.userId;

    const user = await this.getUserByIdRepository.getByEmail(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const transaction = await this.transactionRepository.create(params);

    return transaction;
  }
}
