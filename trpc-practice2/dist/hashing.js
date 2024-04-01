import bcrypt from "bcrypt";
async function hashPass(password) {
    const hashPass = await bcrypt.hash(password, 12);
    return hashPass;
}
export { hashPass };
