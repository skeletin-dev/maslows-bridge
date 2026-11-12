import handleResponse from "./handleResponse";
import { API } from "../../constants";
import { NetworkError } from "../../errors/networkError";

const REQUEST_TIMEOUT = 10000;

function createTimeoutPromise(ms: number): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timeout")), ms),
  );
}

export async function handleRequest<T>(
  path: string,
  options: RequestInit = {},
  /** Override for slow requests such as photo uploads. */
  timeoutMs: number = REQUEST_TIMEOUT,
): Promise<T> {
  try {
    const response = await Promise.race([
      fetch(API + path, options),
      createTimeoutPromise(timeoutMs),
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
