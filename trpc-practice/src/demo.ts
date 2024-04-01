import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.user.createMany({
      data: [
        { username: "shivansh", email: "shivansh@gmail.com" },
        { username: "tanishq", email: "tanishq@gmail.com" },
        { username: "somya", email: "somya@gmail.com" },
        { username: "mann", email: "mann@gmail.com" },
      ],
    });
  } catch (error: any) {
    console.log("couldn't create", error.message);
  }
}

// main();
