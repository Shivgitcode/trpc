import bcrypt from "bcrypt";

async function hashPass(password: string) {
  const hashPass = await bcrypt.hash(password, 12);

  return hashPass;
}

async function unHash(hashPass: string, password: string) {
  const isPassword = await bcrypt.compare(password, hashPass);
  return isPassword;
}

export { hashPass, unHash };
