/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL?: string;
  readonly VITE_SERVICE_ID?: string;
  readonly VITE_TEMPLATE_ID?: string;
  readonly VITE_EMAIL_JS_PUBLIC_KEY?: string;
  readonly VITE_TO_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
