import { ApiError } from "../../errors/apiError";
import NotFoundError from "../../errors/notFoundError";
import ServerError from "../../errors/serverError";
import UnauthorizedError from "../../errors/unauthorizedError";
import ValidationError from "../../errors/validationError";

/** Shown when an error response has no usable message (e.g. an HTML error page). */
const FALLBACK_MESSAGES: Record<number, string> = {
  413: "That file is too large to upload.",
  502: "Couldn't reach the server. Please try again in a moment.",
  503: "The server is temporarily unavailable. Please try again in a moment.",
  504: "The server took too long to respond. Please try again.",
};

export default async function handleResponse<T>(
  response: Response,
): Promise<T> {
  if (response.status === 204) return undefined as T;

  let data: unknown;
  try {
    data = await response.json();
  } catch (e) {
    if (response.ok) throw e;
    data = {};
  }

  if (response.ok) return data as T;

  const { message, errors } = (data ?? {}) as Partial<ApiErrorResponseData>;
  const error = new ApiError(
    message || FALLBACK_MESSAGES[response.status] || "",
    response.status,
    errors,
  );

  switch (error.status) {
    case 401:
      throw new UnauthorizedError(error.message || undefined);
    case 422:
      throw new ValidationError(error.message, error.errors);
    case 404:
      throw new NotFoundError(error.message || undefined);
    case 413:
    case 502:
    case 503:
    case 504:
      throw new ServerError(error.message);
    case 500:
      throw new ServerError(error.message || undefined);
    default:
      throw new ServerError();
  }
}
