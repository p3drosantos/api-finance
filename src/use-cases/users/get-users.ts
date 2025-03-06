import {
  IGetUsersRepository,
  IGetUsersUseCase,
} from "../../controllers/user/get-user/protocols";

export class GetUsersUseCase implements IGetUsersUseCase {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}
  async execute() {
    return this.getUsersRepository.getUsers();
  }
}
