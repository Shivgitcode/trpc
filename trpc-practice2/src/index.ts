import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { userRouter } from "./routers/users.js";
import cookieParser from "cookie-parser";
import { createContext } from "./context.js";
import { animeRouter } from "./routers/anime.js";
import { t } from "./trpc.js";

const app = express();
const mergedRouter = t.mergeRouters(userRouter, animeRouter);

app.use(express.json());
app.use(cookieParser());

app.use(
  "/trpc",
  createExpressMiddleware({
    router: mergedRouter,
    createContext: createContext,
  })
);

app.listen(3000, () => {
  console.log("Server listening on Port 3000");
});
