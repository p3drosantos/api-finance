import { HttpRequest } from "../../protocols";
import { CreateUserController } from "./create-user";
import { CreateUserParams } from "./protocols";

describe("Create User Controller", () => {
  class CreateUserUseCaseStub {
    async execute(user: CreateUserParams) {
      return {
        id: "any_id",
        ...user,
      };
    }
  }

  it("should create a user successfully", async () => {
    const createUserController = new CreateUserController(
      new CreateUserUseCaseStub(),
    );

    const httpRequest = {
      body: {
        firstName: "John",
        lastName: "Doe",
        email: "jhondoe@gmail.com",
        password: "12345678",
      },
    };

    const result = await createUserController.handle(httpRequest);

    expect(result.statusCode).toBe(201);
    expect(result.body).toMatchObject(httpRequest.body);
  });

  it("should return 400 if firstName is missing", async () => {
    const createUserController = new CreateUserController(
      new CreateUserUseCaseStub(),
    );

    const httpRequest = {
      body: {
        lastName: "Doe",
        email: "jhondoe@gmail.com",
        password: "12345678",
      },
    };

    const result = await createUserController.handle(httpRequest as any);

    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if lastName is missing", async () => {
    const createUserController = new CreateUserController(
      new CreateUserUseCaseStub(),
    );
    const httpRequest = {
      body: {
        firstName: "John",
        email: "jhondoe@gmail.com",
        password: "12345678",
      },
    };

    const result = await createUserController.handle(httpRequest as any);

    expect(result.statusCode).toBe(400);
  });
});
