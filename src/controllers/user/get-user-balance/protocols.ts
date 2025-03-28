export interface GetUserBalanceResponse {
  userId: string;
  earnings: number;
  expenses: number;
  investments: number;
  balance: number;
}

export interface IGetUserBalanceRepository {
  getUserBalance(userId: string): Promise<GetUserBalanceResponse>;
}
