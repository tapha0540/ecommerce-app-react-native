import bcrypt from "bcrypt";

const saltRounds = 10;

const PasswordHash = {
  hash: async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  },
  compare: async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  },
};

export default PasswordHash;
