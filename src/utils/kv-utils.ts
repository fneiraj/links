import type { Env} from "../types";

export async function checkIfslugExists (slug: string, env: Env) {
  return !!(await env.LINKS_KV.get(slug));
}

export function getLinkFromKV(env: Env, slug: string) {
  return env.LINKS_KV.get(slug);
}

export function saveLinkToKV(env: Env, slug: string, longLink: string, password?: string) {
  return env.LINKS_KV.put(slug, createObjectToStoreInKV(longLink, password));
}

export function deleteLinkFromKV(env: Env, slug: string) {
  return env.LINKS_KV.delete(slug);
}

function createObjectToStoreInKV(longLink: string, password: string | undefined) {
  if (password) {
    return JSON.stringify({
      longLink,
      password
    })
  }
  
  return JSON.stringify({
    longLink
  })
}

export default {
  checkIfslugExists,
  getLinkFromKV,
  saveLinkToKV,
  deleteLinkFromKV
}