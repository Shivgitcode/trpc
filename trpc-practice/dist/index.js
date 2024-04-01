import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { mergedRoutes } from "./routers/posts.js";
import { createContext } from "./context.js";
const app = express();
app.use(express.json());
app.use("/trpc", createExpressMiddleware({
    router: mergedRoutes,
    createContext: createContext,
}));
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
