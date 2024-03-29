
import type { Env } from "./types";
import router from './router';

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    return router.handle(request, env, ctx).then((res: Response) => res);
  },
};