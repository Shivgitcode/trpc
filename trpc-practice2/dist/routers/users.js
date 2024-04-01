import { hashPass, unHash } from "../hashing.js";
import { t } from "../trpc.js";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
export const secret = "thisistopsecret";
export const prisma = new PrismaClient();
const userProcedure = t.procedure.input(z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
}));
const loginProcedure = t.procedure.input(z.object({
    username: z.string(),
    password: z.string(),
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
    login: loginProcedure.mutation(async ({ ctx, input }) => {
        const { req, res } = ctx;
        const { username, password } = input;
        const findUser = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (!findUser) {
            return res.status(404).json({
                message: "user not found",
                success: false,
            });
        }
        const { password: hashedPass } = findUser;
        const isPassword = await unHash(hashedPass, password);
        console.log(isPassword);
        if (isPassword) {
            const token = jwt.sign({ id: findUser.id }, secret);
            res.cookie("jwt", token);
            return {
                message: "successfully logged In",
                data: token,
            };
        }
        else {
            return {
                message: "Invalid username or password",
            };
        }
    }),
    logout: t.procedure.mutation(({ ctx }) => {
        const { req, res } = ctx;
        res.cookie("jwt", "", { maxAge: 5 });
        return {
            message: "successfully logged out",
        };
    }),
});
export { userRouter };
