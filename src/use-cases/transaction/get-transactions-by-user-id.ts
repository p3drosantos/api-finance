import {
  IGetTransactionsByUserIdRepository,
  IGetTransactionsByUserIdUseCase,
} from "../../controllers/transaction/get-transactions-by-user-id/protocols";
import { IGetUserByIdRepository } from "../../controllers/user/get-user-by-id/protocols";
import { UserNotFoundError } from "../../errors/user";

export class GetTransactionsByUserIdUseCase
  implements IGetTransactionsByUserIdUseCase
{
  constructor(
    private readonly getTransactionsByUserIdRepository: IGetTransactionsByUserIdRepository,
    private readonly getUserByIdRepository: IGetUserByIdRepository,
  ) {}

  async execute(userId: string) {
    const user = await this.getUserByIdRepository.getUserById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    return await this.getTransactionsByUserIdRepository.getTransactionsByUserId(
      userId,
    );
  }
}
