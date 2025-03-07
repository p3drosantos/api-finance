import {
  IGetUserByIdRepository,
  IGetUserByIdUseCase,
} from "../../controllers/user/get-user-by-id/protocols";
import { User } from "../../models/user";

export class GetUserByIdUseCase implements IGetUserByIdUseCase {
  constructor(private readonly getUserByIdRepository: IGetUserByIdRepository) {}
  execute(id: string): Promise<User | null> {
    return this.getUserByIdRepository.getUserById(id);
  }
}
