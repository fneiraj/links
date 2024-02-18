import { IRequestStrict } from "itty-router";
import NotFoundPage from '../pages/not-found.html';
import { responseHtml, responseRedirect } from "../utils/utils";
import { getLinkFromKV } from "../utils/kv-utils";
import type { Env } from "../types";

export default async function resolveLink(request: IRequestStrict, env: Env) {
  const slug = request.params.slug;
  const redirectTo = await getLinkFromKV(env, slug.toLowerCase());

  if (redirectTo) {
    return responseRedirect(JSON.parse(redirectTo));
  }

  return responseHtml(NotFoundPage, 404);
}
