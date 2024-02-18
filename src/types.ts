export interface Env {
  LINKS_KV: KVNamespace;
  HOST_URL: string;
}

export interface NewLinkRequest {
  url: string;
  slug?: string;
  password?: string;
}

export interface LinkRequest {
  params: string;
}

export interface Link {
  longLink: string;
  password?: string;
}