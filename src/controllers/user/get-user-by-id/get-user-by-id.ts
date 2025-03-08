import { notFound, ok, serverError } from "../../helpers";
import { HttpRequest } from "../../protocols";
import { IGetUserByIdController, IGetUserByIdUseCase } from "./protocols";

export class GetUserByIdController implements IGetUserByIdController {
  constructor(private readonly getUserByIdUseCase: IGetUserByIdUseCase) {}

  async handle(httpRequest: HttpRequest<any>) {
    try {
      const { id } = httpRequest.body;
      const user = await this.getUserByIdUseCase.execute(id);

      if (!user) {
        return notFound("User not found");
      }

      return ok(user);
    } catch (error) {
      console.log(error);
      return serverError("Internal server error");
    }
  }
}
