export interface HttpError extends Error {
  statusCode?: number;
}

export let HttpErrorConstructor = (message: string, statusCode: number) => {
  let error: HttpError = new Error(message);
  error.statusCode = statusCode;
  return error;
};
