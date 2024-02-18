import { IRequestStrict } from "itty-router";
import type { Env, NewLinkRequest } from "../types";
import { responseJson } from "../utils/utils";
import { checkIfslugExists, saveLinkToKV } from "../utils/kv-utils";

export default async function createLink(request: IRequestStrict, env: Env) {
  const {url: longLink, slug, password} = await request.json() as NewLinkRequest;

  if (!!slug && await checkIfslugExists(slug, env)) {
    return responseJson({ error: `Slug ${slug} already exists` }, 400);
  }

  if (!!slug) {
    //@ts-ignore
    await saveLinkToKV(env, slug, longLink, password);
    return responseJson({ short: `${env.HOST_URL}/${slug}`, large: longLink }, 201);
  }

  let slugGenerated = btoa(Math.random() + "").slice(0, 9);

  while (await checkIfslugExists(slugGenerated, env)) {
    slugGenerated = btoa(Math.random() + "").slice(0, 9);
  }

  await saveLinkToKV(env, slugGenerated, longLink, password);

  return responseJson({ short: `${env.HOST_URL}/${slugGenerated}`, large: longLink }, 201);
}