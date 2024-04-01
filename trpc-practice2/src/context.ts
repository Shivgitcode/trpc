import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
const createContext = ({ req, res }: CreateExpressContextOptions) => {
  return {
    req,
    res,
  };
};

export { createContext };
