import type { APIRoute } from "astro";
import { BACKEND_URL } from "../../constants";

export const prerender = false;

/**
 * Same-origin proxy to the Rails API for the admin.
 *
 * The browser talks only to this site, so the login cookie is first-party and is kept by every
 * browser (Safari and iPhones block cookies set by another site, like the API on railway.app).
 * The proxy keeps the token in its own httpOnly cookie, sends it to Rails on each request, and
 * passes Rails' status and JSON back unchanged.
 *
 * Runs as a Netlify Function: 60s time limit, and uploads are capped at ~4.5 MB.
 */

const AUTH_COOKIE = "auth_token";
const COOKIE_PATH = "/api";
// Leave headroom under Netlify's 60 second limit so we can return a readable error.
const UPSTREAM_TIMEOUT_MS = 50_000;

function errorResponse(message: string, status: number) {
  return Response.json({ message }, { status, headers: { "cache-control": "no-store" } });
}

/** Finds the auth cookie in Rails' Set-Cookie headers (login sets it, logout clears it). */
function readAuthCookie(setCookieHeaders: string[]) {
  for (const header of setCookieHeaders) {
    const [pair = "", ...attributes] = header.split(";");
    const eq = pair.indexOf("=");
    if (eq === -1 || pair.slice(0, eq).trim() !== AUTH_COOKIE) continue;
    const value = decodeURIComponent(pair.slice(eq + 1).trim());
    const expired = attributes.some((attr) => /^\s*max-age\s*=\s*0\s*$/i.test(attr));
    return { value, cleared: !value || expired };
  }
  return null;
}

export const ALL: APIRoute = async ({ request, params, cookies, url }) => {
  if (!BACKEND_URL) return errorResponse("The API address isn't configured for this site.", 500);

  const path = params.path ?? "";
  const headers = new Headers({ accept: "application/json" });
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  const token = cookies.get(AUTH_COOKIE)?.value;
  if (token) headers.set("cookie", `${AUTH_COOKIE}=${encodeURIComponent(token)}`);

  const hasBody = request.method !== "GET" && request.method !== "HEAD";

  let upstream: Response;
  try {
    upstream = await fetch(`${BACKEND_URL}/${path}${url.search}`, {
      method: request.method,
      headers,
      body: hasBody ? await request.arrayBuffer() : undefined,
      redirect: "manual",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch (error) {
    const timedOut = error instanceof DOMException && error.name === "TimeoutError";
    return timedOut
      ? errorResponse("The server took too long to respond. Please try again.", 504)
      : errorResponse("Couldn't reach the server. Please try again in a moment.", 502);
  }

  const authCookie = readAuthCookie(upstream.headers.getSetCookie());
  // Clear on logout even if Rails rejects it, and drop a token Rails no longer accepts.
  if (path === "logout" || authCookie?.cleared || (token && upstream.status === 401)) {
    cookies.delete(AUTH_COOKIE, { path: COOKIE_PATH });
  } else if (authCookie) {
    cookies.set(AUTH_COOKIE, authCookie.value, {
      httpOnly: true,
      secure: url.protocol === "https:",
      sameSite: "lax",
      path: COOKIE_PATH,
    });
  }

  const responseHeaders = new Headers({ "cache-control": "no-store" });
  const upstreamType = upstream.headers.get("content-type");
  if (upstreamType) responseHeaders.set("content-type", upstreamType);

  const noBody = upstream.status === 204 || upstream.status === 304 || request.method === "HEAD";
  return new Response(noBody ? null : upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
};
