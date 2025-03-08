import { IGetUserByEmailRepository } from "../../controllers/user/protocols";
import prisma from "../../db/prisma";
import { User } from "../../models/user";

export class GetUserByEmailRepository implements IGetUserByEmailRepository {
  async getByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
