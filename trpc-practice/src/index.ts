import express from "express";
import { userRouter } from "./routers/users.js";

import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { mergedRoutes } from "./routers/posts.js";

const app = express();

app.use(express.json());

app.use("/trpc", createExpressMiddleware({ router: mergedRoutes }));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
