import { ApiError } from "../../errors/apiError";
import NotFoundError from "../../errors/notFoundError";
import ServerError from "../../errors/serverError";
import UnauthorizedError from "../../errors/unauthorizedError";
import ValidationError from "../../errors/validationError";

export default async function handleResponse<T>(
  response: Response,
): Promise<T> {
  if (response.status === 204) return;
  try {
    const data = await response.json();
    if (!response.ok)
      throw new ApiError(
        (data as ApiErrorResponseData).message,
        response.status,
        (data as ApiErrorResponseData).errors,
      );
    console.log("here");
    return data as T;
  } catch (e) {
    if (e instanceof ApiError) {
      switch (e.status) {
        case 401:
          throw new UnauthorizedError(e.message);
        case 422:
          throw new ValidationError(e.message, e.errors);
        case 404:
          throw new NotFoundError(e.message);
        case 500:
          throw new ServerError(e.message);
        default:
          throw new ServerError();
      }
    }
    throw e;
  }
}
