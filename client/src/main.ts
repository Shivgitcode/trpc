import { createTRPCProxyClient } from "@trpc/client";
import { httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../server/src/index";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

async function main() {
  const result = await client.sayHi.query();
  console.log(result);
}

async function mutate() {
  const result = await client.logToServer.mutate("Hi from client");
  console.log(result);
}
async function userRouter() {
  const result = await client.getUser.query({
    userId: "adlkfajlkd",
    name: "shivansh",
  });
  console.log(result);
}

// main();

// mutate();
userRouter();
