/** The Rails API, e.g. "https://…railway.app/v1". Only server code calls it directly. */
export const BACKEND_URL = import.meta.env.PUBLIC_BACKEND_URL ?? "";

/**
 * Base URL for API requests. Server-rendered pages call the Rails API directly. In the browser,
 * requests go through this site's own /api proxy (src/pages/api/[...path].ts) so the login
 * cookie belongs to this site. Safari, iPhones and private windows block cookies set by a
 * different site, such as an API on railway.app.
 */
export const API = import.meta.env.SSR ? BACKEND_URL : "/api";
