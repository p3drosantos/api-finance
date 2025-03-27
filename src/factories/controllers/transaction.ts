import { CreateTransactionController } from "../../controllers/transaction/create-transaction/create-transaction";
import { GetTransactionsByUserIdController } from "../../controllers/transaction/get-transactions-by-user-id/get-transactions-by-user-id";
import { UpdateTransactionController } from "../../controllers/transaction/update-transaction/update-transactions";
import { CreateTransactionRepository } from "../../repositories/transaction/create-transaction";
import { GetTransactionsByUserIdRepository } from "../../repositories/transaction/get-transactions-by-user-id";
import { UpdateTransactionRepository } from "../../repositories/transaction/update-transaction";
import { GetUserByIdRepository } from "../../repositories/user/get-user-by-id";
import { CreateTransactionUseCase } from "../../use-cases/transaction/create-transaction";
import { GetTransactionsByUserIdUseCase } from "../../use-cases/transaction/get-transactions-by-user-id";
import { UpadateTransactionUseCase } from "../../use-cases/transaction/update-transaction";

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

export const makeUpdateTransactionController = () => {
  const updateTransactionRepository = new UpdateTransactionRepository();
  const updateTransactionUseCase = new UpadateTransactionUseCase(
    updateTransactionRepository,
  );
  const updateTransactionController = new UpdateTransactionController(
    updateTransactionUseCase,
  );
  return updateTransactionController;
};
