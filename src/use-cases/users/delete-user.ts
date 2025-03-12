import { User } from "../../models/user";
import {
  IDeleteUserRepository,
  IDeleteUserUseCase,
} from "../../controllers/user/delete-user/protocols";

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}

  async execute(id: string): Promise<User | null> {
    const user = await this.deleteUserRepository.delete(id);
    return user;
  }
}
