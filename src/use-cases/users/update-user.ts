import {
  IUpdateUserRepository,
  IUpdateUserUseCase,
  UpdateUserParams,
} from "../../controllers/user/update-user/protocols";
import { User } from "../../models/user";
const bcrypt = require("bcrypt");

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async execute(id: string, params: UpdateUserParams): Promise<User> {
    const user = { ...params };

    if (params.password) {
      const hashedPassword = await bcrypt.hash(params.password, 10);
      user.password = hashedPassword;
    }

    const updateUser = await this.updateUserRepository.updateUser(id, user);
    return updateUser;
  }
}
