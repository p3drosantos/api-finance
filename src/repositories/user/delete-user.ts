import { IDeleteUserRepository } from "../../controllers/user/delete-user/protocols";
import prisma from "../../db/prisma";
import { User } from "../../models/user";

export class DeleteUserRepository implements IDeleteUserRepository {
  async delete(id: string): Promise<User | null> {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    return user;
  }
}
