import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { createContext } from "./context.js";
import { TRPCError } from "@trpc/server";

const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create();

const authorized = t.middleware(({ ctx, next }) => {
  const token = ctx.req.cookies.jwt;
  if (token) {
    return next();
  } else {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
});

export { t, authorized };
