import {
  IGetUserBalanceRepository,
  IGetUserBalanceUseCase,
} from "../../controllers/user/get-user-balance/protocols";
import { IGetUserByIdRepository } from "../../controllers/user/get-user-by-id/protocols";
import { UserNotFoundError } from "../../errors/user";

export class GetUserBalanceUseCase implements IGetUserBalanceUseCase {
  constructor(
    private readonly getUserBalanceRepository: IGetUserBalanceRepository,
    private readonly getUserByIdRepository: IGetUserByIdRepository,
  ) {}

  async execute(userId: string) {
    const user = await this.getUserByIdRepository.getUserById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const userBalance =
      await this.getUserBalanceRepository.getUserBalance(userId);
    return userBalance;
  }
}
