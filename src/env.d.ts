/* eslint-disable @typescript-eslint/triple-slash-reference -- Astro generates .astro/types.d.ts */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_BACKEND_URL: string;
  readonly PUBLIC_SERVICE_ID: string;
  readonly PUBLIC_TEMPLATE_ID: string;
  readonly PUBLIC_EMAIL_JS_PUBLIC_KEY: string;
  readonly PUBLIC_TO_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
