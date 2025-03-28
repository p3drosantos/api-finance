import {
  GetUserBalanceResponse,
  IGetUserBalanceRepository,
} from "../../controllers/user/get-user-balance/protocols";
import prisma from "../../db/prisma";

export class GetUserBalanceRepository implements IGetUserBalanceRepository {
  async getUserBalance(userId: string): Promise<GetUserBalanceResponse> {
    const [expensesResult, earningsResult, investmentsResult] =
      await Promise.all([
        prisma.transaction.aggregate({
          where: { userId, type: "EXPENSE" },
          _sum: { amount: true },
        }),
        prisma.transaction.aggregate({
          where: { userId, type: "EARNING" },
          _sum: { amount: true },
        }),
        prisma.transaction.aggregate({
          where: { userId, type: "INVESTMENT" },
          _sum: { amount: true },
        }),
      ]);

    // Converte Decimal para number antes de fazer operações matemáticas
    const totalExpenses = expensesResult._sum.amount?.toNumber() ?? 0;
    const totalEarnings = earningsResult._sum.amount?.toNumber() ?? 0;
    const totalInvestments = investmentsResult._sum.amount?.toNumber() ?? 0;

    const balance = totalEarnings - totalExpenses - totalInvestments;

    return {
      userId,
      earnings: totalEarnings,
      expenses: totalExpenses,
      investments: totalInvestments,
      balance,
    };
  }
}
