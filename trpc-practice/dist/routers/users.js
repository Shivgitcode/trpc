import { z } from "zod";
import { t } from "../trpc.js";
import { prisma } from "../demo.js";
const userRouter = t.router({
    getUsers: t.procedure.query(async () => {
        const allUser = await prisma.user.findMany({});
        return allUser;
    }),
    createUser: t.procedure
        .input(z.object({ username: z.string(), email: z.string().email() }))
        .mutation(async ({ input }) => {
        const userData = input;
        const newUser = await prisma.user.create({
            data: userData,
        });
        //   console.log(input);
        return {
            message: "data sent",
            newUser,
        };
    }),
});
export { userRouter };
