import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { userRouter } from "./routers/users.js";
const app = express();
app.use(express.json());
app.use("/trpc", createExpressMiddleware({ router: userRouter }));
app.listen(3000, () => {
    console.log("Server listening on Port 3000");
});
