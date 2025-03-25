import { CreateTransactionController } from "../../controllers/transaction/create-transaction/create-transaction";
import { GetTransactionsByUserIdController } from "../../controllers/transaction/get-transactions-by-user-id/get-transactions-by-user-id";
import { CreateTransactionRepository } from "../../repositories/transaction/create-transaction";
import { GetTransactionsByUserIdRepository } from "../../repositories/transaction/get-transactions-by-user-id";
import { GetUserByEmailRepository } from "../../repositories/user/get-user-by-email";
import { GetUserByIdRepository } from "../../repositories/user/get-user-by-id";
import { CreateTransactionUseCase } from "../../use-cases/transaction/create-transaction";
import { GetTransactionsByUserIdUseCase } from "../../use-cases/transaction/get-transactions-by-user-id";

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

export const makeGetTransactionsByUserIdController = () => {
  const getTransactionsByUserIdRepository =
    new GetTransactionsByUserIdRepository();
  const getUserByIdRepository = new GetUserByIdRepository();
  const getTransactionsByUserIdUseCase = new GetTransactionsByUserIdUseCase(
    getTransactionsByUserIdRepository,
    getUserByIdRepository,
  );
  const getTransactionsByUserIdController =
    new GetTransactionsByUserIdController(getTransactionsByUserIdUseCase);
  return getTransactionsByUserIdController;
};
