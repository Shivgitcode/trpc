import { initTRPC } from "@trpc/server";
import { TRPCError } from "@trpc/server";
const t = initTRPC
    .context()
    .create();
const authorized = t.middleware(({ ctx, next }) => {
    const token = ctx.req.cookies.jwt;
    if (token) {
        return next();
    }
    else {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
});
export { t, authorized };
