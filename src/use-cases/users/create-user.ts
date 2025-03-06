import {
  CreateUserParams,
  ICreateUserRepository,
  ICreateUserUseCase,
} from "../../controllers/user/create-user/protocols";
import { User } from "../../models/user";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}
  execute(params: CreateUserParams): Promise<User> {
    return this.createUserRepository.createUser(params);
  }
}
