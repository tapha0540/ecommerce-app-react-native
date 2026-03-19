import User from "../models/user.model.js";

/**
 * @param req
 * @returns Promise<{ success: boolean, message: string}>
 */
const AuthController = {
  signUp: async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;
    
  },
  logIn: async () => {},
  getSession: async () => {},
};

export default AuthController;
