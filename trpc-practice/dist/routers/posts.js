import { t } from "../trpc.js";
import { z } from "zod";
import { userRouter } from "./users.js";
import { prisma } from "../demo.js";
const postRouter = t.router({
    createPost: t.procedure
        .input(z.object({ title: z.string(), description: z.string() }))
        .mutation(async ({ input }) => {
        //   console.log(input);
        const postData = input;
        const newPost = await prisma.post.create({
            data: postData,
        });
        return {
            message: "data sent",
            data: newPost,
        };
    }),
    getPosts: t.procedure.query(async () => {
        const allPosts = await prisma.post.findMany({});
        return allPosts;
    }),
});
export const mergedRoutes = t.mergeRouters(userRouter, postRouter);
