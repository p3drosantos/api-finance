import {
  IUpdateUserRepository,
  UpdateUserParams,
} from "../../controllers/user/update-user/protocols";
import prisma from "../../db/prisma";
import { User } from "../../models/user";

export class UpdateUserRepository implements IUpdateUserRepository {
  async updateUser(id: string, params: UpdateUserParams): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data: params,
    });
    return user;
  }
}
