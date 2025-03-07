import { HttpResponse } from "./protocols";

export const badRequest = <T>(message: string): HttpResponse<T> => {
  return {
    statusCode: 400,
    body: message,
  };
};

export const created = <T>(data: T): HttpResponse<T> => {
  return {
    statusCode: 201,
    body: data,
  };
};

export const serverError = <T>(message: string): HttpResponse<T> => {
  return {
    statusCode: 500,
    body: message,
  };
};
