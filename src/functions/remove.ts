import { IRequestStrict } from "itty-router";
import type { Env, NewLinkRequest } from "../types";
import { responseJson } from "../utils/utils";
import { checkIfslugExists, deleteLinkFromKV, getLinkFromKV } from "../utils/kv-utils";

export default async function removeLink(request: IRequestStrict, env: Env) {
  const { slug, password } = await request.json() as NewLinkRequest;

  if (!slug) {
    return responseJson({ error: "Slug is required" }, 400);
  }

  if (!password) {
    return responseJson({ error: "Password is required" }, 400);
  }

  if (!(await checkIfslugExists(slug, env))) {
    return responseJson({ error: `Slug ${slug} does not exist` }, 400);
  }

  //@ts-ignore
  const link = JSON.parse(await getLinkFromKV(env, slug));

  if (link.password !== password) {
    return responseJson({ error: "Password is incorrect" }, 401);
  }

  await deleteLinkFromKV(env, slug);


  return responseJson({ message: "Link deleted", short: `${env.HOST_URL}/${slug}` }, 201);
}