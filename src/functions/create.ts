import { IRequestStrict } from "itty-router";
import type { Env, NewLinkRequest } from "../types";
import { generateSlug, responseJson } from "../utils/utils";
import { checkIfslugExists, saveLinkToKV } from "../utils/kv-utils";

export default async function createLink(request: IRequestStrict, env: Env) {
  const { url: longLink, slug, password } = await request.json() as NewLinkRequest;

  if (!!slug && !/^[a-zA-Z0-9-_]{1,20}$/.test(slug)) {
    return responseJson({ error: "Slug must be alphanumeric and have a maximum of 20 characters" }, 400);
  }

  const slugLower = slug?.toLowerCase();


  if (!!slugLower && await checkIfslugExists(slugLower, env)) {
    return responseJson({ error: `Slug ${slugLower} already exists` }, 400);
  }

  if (!!slugLower) {
    //@ts-ignore
    await saveLinkToKV(env, slugLower, longLink, password);
    return responseJson({ short: `${env.HOST_URL}/${slugLower}`, large: longLink }, 201);
  }

  let slugGenerated = generateSlug();

  while (await checkIfslugExists(slugGenerated, env)) {
    slugGenerated = generateSlug();
  }

  await saveLinkToKV(env, slugGenerated, longLink, password);

  return responseJson({ short: `${env.HOST_URL}/${slugGenerated}`, large: longLink }, 201);
}