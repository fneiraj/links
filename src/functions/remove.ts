import { IRequestStrict } from "itty-router";
import type { Env, NewLinkRequest } from "../types";
import { responseJson } from "../utils/utils";
import { checkIfslugExists, deleteLinkFromKV, getLinkFromKV } from "../utils/kv-utils";

export default async function removeLink(request: IRequestStrict, env: Env) {
  const { slug, password } = await request.json() as NewLinkRequest;

  if (!slug) {
    return responseJson({ error: "slug is required" }, 400);
  }

  if (!password) {
    return responseJson({ error: "password is required" }, 400);
  }

  if (!(await checkIfslugExists(slug, env))) {
    return responseJson({ error: "slug does not exist" }, 404);
  }

  //@ts-ignore
  const link = JSON.parse(await getLinkFromKV(env, slug));

  if (link.password !== password) {
    return responseJson({ error: "password is incorrect" }, 401);
  }

  await deleteLinkFromKV(env, slug);


  return responseJson({ message: "link deletedd", short: slug }, 201);
}