import { HttpResponse } from "../protocols";

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

export const serverError = (
  message: string,
): HttpResponse<{ error: string }> => {
  return {
    statusCode: 500,
    body: { error: message },
  };
};

export const ok = <T>(data: T): HttpResponse<T> => {
  return {
    statusCode: 200,
    body: data,
  };
};

export const notFound = (message: string): HttpResponse<{ error: string }> => {
  return {
    statusCode: 404,
    body: { error: message },
  };
};
