import { authorized, t } from "../trpc.js";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { prisma, secret } from "./users.js";
const animeProcedure = t.procedure.use(authorized).input(z.object({
    animeName: z.string(),
    totalEpisodes: z.number(),
}));
const animeRouter = t.router({
    createAnime: animeProcedure.mutation(async ({ input, ctx }) => {
        const { req, res } = ctx;
        const token = req.cookies.jwt;
        const userId = jwt.verify(token, secret);
        const createAnime = await prisma.anime.create({
            include: {
                user: true,
            },
            data: {
                ...input,
                userId: userId.id,
            },
        });
        return {
            message: "anime created",
            data: createAnime,
        };
    }),
});
export { animeRouter };
