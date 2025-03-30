import { IGetUserByIdRepository } from "../../controllers/user/get-user-by-id/protocols";
import prisma from "../../db/prisma";

export class GetUserByIdRepository implements IGetUserByIdRepository {
  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
