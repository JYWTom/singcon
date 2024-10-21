/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly PUBLIC_PB: string;
  readonly PUBLIC_REDIRECT: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
