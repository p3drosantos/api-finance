import { IGetUsersRepository } from "../../controllers/user/get-user/protocols";
import prisma from "../../db/prisma";
import { User } from "../../models/user";

export class GetUsersRepository implements IGetUsersRepository {
  getUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }
}
