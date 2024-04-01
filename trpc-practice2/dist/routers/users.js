import { hashPass } from "../hashing.js";
import { t } from "../trpc.js";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const userProcedure = t.procedure.input(z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
}));
const loginProcedure = t.procedure.input(z.object({
    username: z.string(),
    password: z.string()
}));
const userRouter = t.router({
    register: userProcedure.mutation(async ({ input }) => {
        const { password } = input;
        const hashedPass = await hashPass(password);
        const newUser = await prisma.user.create({
            data: {
                ...input,
                password: hashedPass,
            },
        });
        return {
            message: "registered successfully",
            data: newUser,
        };
    }),
    login: 
});
export { userRouter };
