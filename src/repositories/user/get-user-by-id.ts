import { IGetUserByIdRepository } from "../../controllers/user/get-user-by-id/protocols";
import prisma from "../../db/prisma";

export class GetUserByIdRepository implements IGetUserByIdRepository {
  async getUserById(id: string) {
    console.log("ID recebido no repositório:", id);
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
