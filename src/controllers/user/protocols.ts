import { User } from "../../models/user";

export interface IGetUserByEmailRepository {
  getByEmail(email: string): Promise<User | null>;
}
