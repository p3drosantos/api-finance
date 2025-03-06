import { User } from "../../../models/user";
import { HttpRequest, HttpResponse } from "../../protocols";
import {
  CreateUserParams,
  ICreateUserController,
  ICreateUserUseCase,
} from "./protocols";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<User>> {
    try {
      const params = httpRequest.body;

      if (!params) {
        return {
          statusCode: 400,
          body: "Please specify a body",
        };
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

      const user = await this.createUserUseCase.execute(params);
      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: "Internal server error",
      };
    }
  }
}
