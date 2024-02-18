import type { Link} from "../types";

export function responseJson(response: any, status: number = 200) {
  return new Response(JSON.stringify(response), {
    headers: { "content-type": "application/json" },
    status: status,
  })
}

export function responseHtml(response: any, status: number = 200) {
  return new Response(response, {
    headers: { "content-type": "text/html;charset=UTF-8" },
    status: status,
  });
}

export function responsePlain(response: any, status: number = 200) {
  return new Response(response, {
    headers: { "content-type": "text/plain;charset=UTF-8" },
    status: status,
  });
}

export function responseCss(response: any, status: number = 200) {
  return new Response(response, {
    headers: { "content-type": "text/css;charset=UTF-8" },
    status: status,
  });
}

export function responseRedirect(link: Link, status: number = 302) {
  return Response.redirect(link.longLink, status);
}

export function generateSlug() {
  return btoa(Math.random() + "").slice(0, 9).toLocaleLowerCase();
}

export default {
  responseJson,
  responseHtml,
  responseRedirect
}
