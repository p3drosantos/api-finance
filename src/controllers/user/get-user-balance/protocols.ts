import { HttpRequest, HttpResponse } from "../../protocols";

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

export interface IGetUserBalanceUseCase {
  execute(userId: string): Promise<GetUserBalanceResponse>;
}

export interface IGetUserBalanceController {
  handle(
    httpRequest: HttpRequest<{ id: string }>,
  ): Promise<HttpResponse<GetUserBalanceResponse | { error: string }>>;
}
