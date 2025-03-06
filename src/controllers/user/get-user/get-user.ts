import { IGetUserController, IGetUsersUseCase } from "./protocols";

export class GetUsersController implements IGetUserController {
  constructor(private readonly getUserUseCase: IGetUsersUseCase) {}
  async handle() {
    try {
      const users = await this.getUserUseCase.execute();
      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
