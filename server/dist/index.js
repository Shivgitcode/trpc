import express from "express";
import cors from "cors";
import { z } from "zod";
import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
const t = initTRPC
    .context()
    .create();
const userProcedure = t.procedure.input(z.object({ userId: z.string(), name: z.string() }));
const createContext = ({ req, res }) => {
    return {
        req,
        res,
    };
};
const appRouter = t.router({
    sayHi: t.procedure.query(() => {
        return "Hi";
    }),
    logToServer: t.procedure
        .input((v) => {
        if (typeof v === "string")
            return v;
        throw new Error("Invalid input: Expected string");
    })
        .mutation((req) => {
        console.log(req.input);
        return true;
    }),
});
const userRouter = t.router({
    getUser: userProcedure.query((req) => {
        console.log(req.ctx.req);
        return { id: req.input.userId, name: "shivansh" };
    }),
    update: userProcedure
        .input(z.object({ name: z.string() }))
        .mutation((req) => {
        console.log(req.ctx);
        console.log(`updating user ${req.input.userId} to have the name ${req.input.name}`);
        return { id: req.input.userId, name: req.input.name };
    }),
});
const mergedRouter = t.mergeRouters(appRouter, userRouter);
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use("/trpc", createExpressMiddleware({
    router: mergedRouter,
    createContext,
}));
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
