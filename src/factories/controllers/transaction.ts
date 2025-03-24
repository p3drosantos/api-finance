import { CreateTransactionController } from "../../controllers/transaction/create-transaction/create-transaction";
import { CreateTransactionRepository } from "../../repositories/transaction/create-transaction";
import { GetUserByEmailRepository } from "../../repositories/user/get-user-by-email";
import { GetUserByIdRepository } from "../../repositories/user/get-user-by-id";
import { CreateTransactionUseCase } from "../../use-cases/transaction/create-transaction";

export const makeCreateTransactionController = () => {
  const createTransactionRepository = new CreateTransactionRepository();
  const getUserById = new GetUserByIdRepository();
  const createTransactionUseCase = new CreateTransactionUseCase(
    createTransactionRepository,
    getUserById,
  );
  const createTransactionController = new CreateTransactionController(
    createTransactionUseCase,
  );
  return createTransactionController;
};
