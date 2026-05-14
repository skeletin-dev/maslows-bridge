import handleResponse from "./handleResponse";
import { API } from "../../constants";
import { NetworkError } from "../../errors/networkError";

const REQUEST_TIMEOUT = 10000;

function createTimeoutPromise(): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timeout")), REQUEST_TIMEOUT),
  );
}

export async function handleRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    const response = await Promise.race([
      fetch(API + path, options),
      createTimeoutPromise(),
    ]);

    return await handleResponse<T>(response);
  } catch (error) {
    // Only real transport failures — API errors from handleResponse are Error subclasses too.
    if (error instanceof TypeError)
      throw new NetworkError(
        "Unable to connect to server. Please check your internet.",
        error,
      );

    if (error instanceof Error && error.message.includes("timeout"))
      throw new NetworkError(
        "Request timed out. Please check your connection.",
        error,
      );

    throw error;
  }
}
