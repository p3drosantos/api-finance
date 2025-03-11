import {
  CreateUserParams,
  ICreateUserRepository,
  ICreateUserUseCase,
} from "../../controllers/user/create-user/protocols";
import { EmailAlReadyExistsError } from "../../errors/user";
import { User } from "../../models/user";
import { GetUserByEmailRepository } from "../../repositories/user/get-user-by-email";

const bcrypt = require("bcrypt");

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly createUserRepository: ICreateUserRepository,
    private readonly getUserByIdRepository: GetUserByEmailRepository,
  ) {}
  async execute(params: CreateUserParams): Promise<User> {
    const userAlreadyExists = await this.getUserByIdRepository.getByEmail(
      params.email,
    );

    if (userAlreadyExists) {
      throw new EmailAlReadyExistsError();
    }

    const hashedPassword = await bcrypt.hash(params.password, 10);

    const user = {
      ...params,
      password: hashedPassword,
    };

    return this.createUserRepository.createUser(user);
  }
}
