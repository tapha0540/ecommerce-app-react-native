import Logger from "../config/logger.js";
import User from "../models/user.model.js";


const UserController = {
  createUser: async (req, res) => {
      const user = await User.create({
        first_name: "Moustapha",
        last_name: "Fall",
        email: "fmoustapha0950@gmail.com",
        phone: "+2217631905400",
        password: "0540",
      });
      const success = !!user;
      res.json({
        success,
        message: success ? "Operation reussie" : "Echec",
        user,
      });
  },
};

export default UserController;
