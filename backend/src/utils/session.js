import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

const Session = {
  generateToken: (payload) => {
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "60d" });
    return token;
  },
  decodeToken: (token) => {
    const decoded = jwt.decode(token, SECRET_KEY);
    return decoded;
  },
};

export default Session;
