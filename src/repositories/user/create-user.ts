import {
  CreateUserParams,
  ICreateUserRepository,
} from "../../controllers/user/create-user/protocols";
import prisma from "../../db/prisma";
import { User } from "../../models/user";

export class CreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const user = await prisma.user.create({
      data: {
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        password: params.password,
      },
    });

    if (!user) {
      throw new Error("User not created");
    }

    return user;
  }
}
