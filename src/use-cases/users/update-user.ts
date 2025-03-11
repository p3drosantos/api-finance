import {
  IUpdateUserRepository,
  IUpdateUserUseCase,
  UpdateUserParams,
} from "../../controllers/user/update-user/protocols";
import { User } from "../../models/user";

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async execute(id: string, params: UpdateUserParams): Promise<User> {
    const user = await this.updateUserRepository.updateUser(id, params);
    return user;
  }
}
