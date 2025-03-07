import { User } from "../../../models/user";
import { badRequest, created, serverError } from "../../helpers";
import { HttpRequest, HttpResponse } from "../../protocols";
import {
  CreateUserParams,
  ICreateUserController,
  ICreateUserUseCase,
} from "./protocols";

var validator = require("validator");

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<User | { error: string }>> {
    try {
      const params = httpRequest.body;

      if (!params) {
        return badRequest("Missing request body");
      }

      const requiredFields: (keyof CreateUserParams)[] = [
        "firstName",
        "lastName",
        "email",
        "password",
      ];

      for (const field of requiredFields) {
        const value = params[field];

        if (typeof value !== "string" || !value.trim()) {
          return {
            statusCode: 400,
            body: `Invalid or missing param: ${field}`,
          };
        }
      }

      const passwordIsValid = params.password.length >= 6;

      if (!passwordIsValid) {
        return badRequest("Password must have at least 6 characters");
      }

      const emailIsValid = validator.isEmail(params.email);

      if (!emailIsValid) {
        return badRequest("Invalid email address");
      }

      const user = await this.createUserUseCase.execute(params);
      return created(user);
    } catch (error) {
      console.error(error);
      return serverError("Internal server error");
    }
  }
}
