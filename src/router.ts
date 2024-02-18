import { IRequestStrict, Router } from "itty-router";
import HomePage from "./pages/home.html";
import RemoveLinkPage from "./pages/remove-link.html";
import StylesCSS from "./pages/styles.css";
import createLink from "./functions/create";
import resolveLink from "./functions/resolve";
import removeLink from "./functions/remove";
import { responseCss, responseHtml, responsePlain } from "./utils/utils";
import type { Env } from "./types";

const router = Router();

router.get("/", () => responseHtml(HomePage));

router.get("/remove", () => responseHtml(RemoveLinkPage));

router.get("/styles.css", () => responseCss(StylesCSS));

router.post("/", async (request: IRequestStrict, env: Env) => createLink(request, env));

router.delete("/", async (request: IRequestStrict, env: Env) => removeLink(request, env));

router.get("/:slug", async (request: IRequestStrict, env: Env) => resolveLink(request, env));

export default router