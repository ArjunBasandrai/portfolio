interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;
  readonly CONTACT_TO_EMAIL: string;
  readonly CONTACT_FROM_EMAIL: string;
  readonly TURNSTILE_SECRET_KEY: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY: string;
  readonly UPSTASH_REDIS_REST_URL: string;
  readonly UPSTASH_REDIS_REST_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
