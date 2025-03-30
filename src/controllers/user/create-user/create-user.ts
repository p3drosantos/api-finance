import { EmailAlReadyExistsError } from "../../../errors/user";
import { User } from "../../../models/user";
import { createUserSchema } from "../../../schemas/user";
import { badRequest, created, serverError } from "../../helpers/http";
import { HttpRequest, HttpResponse } from "../../protocols";
import {
  CreateUserParams,
  ICreateUserController,
  ICreateUserUseCase,
} from "./protocols";

import { ZodError } from "zod";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<User | { error: string }>> {
    try {
      if (!httpRequest.body) {
        return badRequest("Missing params");
      }

      const params = httpRequest.body;

      await createUserSchema.parseAsync(params);

      const user = await this.createUserUseCase.execute(params);
      return created(user);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(error.errors[0].message);
      }

      if (error instanceof EmailAlReadyExistsError) {
        return badRequest(error.message);
      }
      console.error(error);
      return serverError("Internal server error");
    }
  }
}
